import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'

export default function LanguageSwitch() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 从 URL 查询参数判断当前语言
    const locale = router.query.locale as string
    setCurrentLang(locale === 'zh' ? 'zh' : 'en')
  }, [router.query.locale])

  useEffect(() => {
    // 点击外部关闭下拉框
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLanguage = (lang: string) => {
    if (lang === currentLang) {
      setIsOpen(false)
      return
    }

    const currentPath = router.pathname
    const query = { ...router.query }

    if (lang === 'zh') {
      // 切换到中文：添加 locale=zh 查询参数
      query.locale = 'zh'
    } else {
      // 切换到英文：移除 locale 查询参数
      delete query.locale
    }

    setIsOpen(false)
    router.push({
      pathname: currentPath,
      query: query
    })
  }

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ]

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0]

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          border: '1px solid var(--nextra-border-color)',
          borderRadius: '6px',
          background: 'var(--nextra-bg)',
          color: 'var(--nextra-fg)',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 500,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--nextra-hover-bg)'
          e.currentTarget.style.borderColor = 'var(--nextra-primary-hue)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--nextra-bg)'
          e.currentTarget.style.borderColor = 'var(--nextra-border-color)'
        }}
      >
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 0,
            minWidth: '140px',
            background: 'var(--nextra-bg)',
            border: '1px solid var(--nextra-border-color)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            overflow: 'hidden',
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                border: 'none',
                background: lang.code === currentLang ? 'var(--nextra-hover-bg)' : 'transparent',
                color: 'var(--nextra-fg)',
                cursor: 'pointer',
                fontSize: '14px',
                textAlign: 'left',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--nextra-hover-bg)'
              }}
              onMouseLeave={(e) => {
                if (lang.code !== currentLang) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <span style={{ fontSize: '18px' }}>{lang.flag}</span>
              <span style={{ flex: 1 }}>{lang.name}</span>
              {lang.code === currentLang && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M13 4L6 11L3 8"
                    stroke="var(--nextra-primary-hue)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

