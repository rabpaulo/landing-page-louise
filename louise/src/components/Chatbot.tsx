import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent as ReactKeyboardEvent } from 'react'
import { ChatCircleDots, PaperPlaneRight, Sparkle, X } from '@phosphor-icons/react'

type ChatMessage = {
  id: number
  role: 'user' | 'assistant'
  content: string
}

type ChatApiResponse = { error?: string }
type GeminiStreamChunk = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string; thought?: boolean }> }
  }>
  error?: unknown
}

const welcomeMessage: ChatMessage = {
  id: 0,
  role: 'assistant',
  content: 'Olá! Posso explicar como esta demonstração funciona e indicar onde conferir informações atualizadas da Louise.',
}

const suggestions = [
  'O que posso explorar nesta página?',
  'Quais categorias aparecem na vitrine?',
  'Este projeto recebe pedidos?',
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])
  const nextMessageId = useRef(1)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const latestMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    latestMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isSending])

  useEffect(() => {
    if (!isOpen) return
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsOpen(false)
      launcherRef.current?.focus()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  async function sendMessage(content: string) {
    const text = content.trim()
    if (!text || isSending || text.length > 1_000) return

    const userMessage: ChatMessage = { id: nextMessageId.current, role: 'user', content: text }
    nextMessageId.current += 2
    const nextMessages = [...messages, userMessage]
    const assistantMessageId = userMessage.id + 1
    let answer = ''
    setMessages([...nextMessages, { id: assistantMessageId, role: 'assistant', content: '' }])
    setDraft('')
    setIsSending(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages
            .filter(message => message.id !== welcomeMessage.id)
            .slice(-10)
            .map(({ role, content: messageContent }) => ({ role, content: messageContent })),
        }),
      })
      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as ChatApiResponse
        throw new Error(result.error || 'Não consegui responder agora. Tente novamente em instantes.')
      }

      if (response.headers.get('content-type')?.includes('text/plain')) {
        answer = await response.text()
        updateAssistantMessage(assistantMessageId, answer)
        return
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('Não consegui responder agora. Tente novamente em instantes.')

      let buffer = ''
      const decoder = new TextDecoder()
      const appendEvent = (event: string) => {
        const data = event
          .split(/\r?\n/)
          .filter(line => line.startsWith('data:'))
          .map(line => line.slice(5).trimStart())
          .join('\n')
        if (!data || data === '[DONE]') return

        let chunk: GeminiStreamChunk
        try {
          chunk = JSON.parse(data) as GeminiStreamChunk
        } catch {
          return
        }
        if (chunk.error) throw new Error('Não consegui responder agora. Tente novamente em instantes.')
        const text = chunk.candidates?.[0]?.content?.parts
          ?.filter(part => part.thought !== true)
          .map(part => part.text ?? '')
          .join('') ?? ''
        if (!text) return
        answer += text
        updateAssistantMessage(assistantMessageId, answer)
      }

      while (true) {
        const { value, done } = await reader.read()
        buffer += decoder.decode(value, { stream: !done })

        let separator: RegExpExecArray | null
        while ((separator = /\r?\n\r?\n/.exec(buffer))) {
          appendEvent(buffer.slice(0, separator.index))
          buffer = buffer.slice(separator.index + separator[0].length)
        }

        if (done) {
          if (buffer.trim()) appendEvent(buffer)
          break
        }
      }

      if (!answer.trim()) throw new Error('Não consegui responder agora. Tente novamente em instantes.')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Não consegui responder agora. Tente novamente em instantes.'
      updateAssistantMessage(assistantMessageId, answer ? `${answer}\n\n${errorMessage}` : errorMessage)
    } finally {
      setIsSending(false)
      inputRef.current?.focus()
    }
  }

  function updateAssistantMessage(id: number, content: string) {
    setMessages(current => {
      const exists = current.some(message => message.id === id)
      if (!exists) return [...current, { id, role: 'assistant', content }]
      return current.map(message => message.id === id ? { ...message, content } : message)
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void sendMessage(draft)
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      void sendMessage(draft)
    }
  }

  function closeChat() {
    setIsOpen(false)
    launcherRef.current?.focus()
  }

  return (
    <div className="chatbot-root">
      {isOpen && (
        <section id="chatbot-panel" className="chatbot-panel" role="dialog" aria-modal="false" aria-labelledby="chatbot-title">
          <header className="chatbot-header">
            <div className="chatbot-brand-icon"><Sparkle size={18} weight="fill" aria-hidden="true" /></div>
            <div className="chatbot-heading-copy">
              <h2 id="chatbot-title">Assistente do projeto</h2>
              <p>Informações desta demonstração</p>
            </div>
            <button className="chatbot-close" type="button" onClick={closeChat} aria-label="Fechar conversa">
              <X size={19} aria-hidden="true" />
            </button>
          </header>

          <div className="chatbot-messages" aria-live="polite" aria-relevant="additions text">
            {messages.filter(message => message.content).map(message => (
              <div className={`chatbot-message chatbot-message-${message.role}`} key={message.id}>
                <p>{message.content}</p>
              </div>
            ))}
            {messages.length === 1 && !isSending && (
              <div className="chatbot-suggestions" aria-label="Sugestões de perguntas">
                {suggestions.map(suggestion => (
                  <button key={suggestion} type="button" onClick={() => void sendMessage(suggestion)}>
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            {isSending && !messages.some(message => message.role === 'assistant' && message.id !== welcomeMessage.id && message.content) && (
              <p className="chatbot-thinking" role="status">Preparando uma resposta…</p>
            )}
            <div ref={latestMessageRef} />
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <label className="visually-hidden" htmlFor="chatbot-question">Escreva sua pergunta</label>
            <textarea
              id="chatbot-question"
              ref={inputRef}
              value={draft}
              onChange={event => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pergunte sobre este conceito…"
              rows={1}
              maxLength={1_000}
              disabled={isSending}
            />
            <button type="submit" disabled={isSending || !draft.trim()} aria-label="Enviar pergunta">
              <PaperPlaneRight size={18} weight="fill" aria-hidden="true" />
            </button>
          </form>
          <p className="chatbot-note">Respostas geradas por IA. Não envie dados pessoais.</p>
        </section>
      )}

      <button
        className={`chatbot-launcher${isOpen ? ' is-open' : ''}`}
        type="button"
        onClick={() => setIsOpen(open => !open)}
        aria-expanded={isOpen}
        aria-controls="chatbot-panel"
        aria-label={isOpen ? 'Fechar o chat' : 'Ajuda do projeto'}
        ref={launcherRef}
      >
        {isOpen ? <X size={23} aria-hidden="true" /> : <ChatCircleDots size={24} weight="fill" aria-hidden="true" />}
        <span>{isOpen ? 'Fechar' : 'Ajuda do projeto'}</span>
      </button>
    </div>
  )
}
