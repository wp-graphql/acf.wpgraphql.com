import { DocSearchModal } from "@docsearch/react";
import clsx from 'clsx'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from "next/router";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { SearchIcon } from '@/components/icons/SearchIcon';
import '@docsearch/css/dist/style.css';

const INDEX_NAME = 'wpgraphql';
const API_KEY = '0c11d662dad18e8a18d20c969b25c65f';
const APP_ID = 'HB50HVJDY8';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false)
  const [initialQuery, setInitialQuery] = useState(null)
  const [initialScrollY, setInitialScrollY] = useState(null);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const onInput = useCallback((e) => {
    setIsOpen(true)
    setInitialQuery(e.key)
  }, [setIsOpen, setInitialQuery])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setInitialScrollY(window.scrollY);
    }
  }, []);

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose
  })

  return (
    <>
      <Head>
        <link rel="preconnect" href={`https://${APP_ID}-dsn.algolia.net`} crossOrigin="true" />
      </Head>
      <SearchContext.Provider value={{ isOpen, onOpen, onClose, onInput }}>
        {children}
      </SearchContext.Provider>
      {isOpen && createPortal(
        <DocSearchModal
          initialQuery={initialQuery}
          initialScrollY={initialScrollY}
          searchParameters={{
            distinct: 1
          }}
          onClose={onClose}
          indexName={INDEX_NAME}
          apiKey={API_KEY}
          appId={APP_ID}
          placeholder="Search..."
          navigator={{
            navigate({ itemUrl }) {
              setIsOpen(false);
              router.push(itemUrl);
            },
          }}
          hitComponent={Hit}
        />, document.body
      )}
    </>
  )
}

function Hit({ hit, children }) {
  return (
    <Link href={hit.url} legacyBehavior>
      <a
        className={clsx({
          'DocSearch-Hit--Result': hit.__is_result?.(),
          'DocSearch-Hit--Parent': hit.__is_parent?.(),
          'DocSearch-Hit--FirstChild': hit.__is_first?.(),
          'DocSearch-Hit--LastChild': hit.__is_last?.(),
          'DocSearch-Hit--Child': hit.__is_child?.(),
        })}
      >
        {children}
      </a>
    </Link>
  )
}

export function Search({ ...props }) {
  let [modifierKey, setModifierKey] = useState()
  let searchButtonRef = useRef()
  let { onOpen, onInput } = useContext(SearchContext)

  useEffect(() => {
    function onKeyDown(event) {
      if (searchButtonRef && searchButtonRef.current === document.activeElement && onInput) {
        if (/[a-zA-Z0-9]/.test(String.fromCharCode(event.keyCode))) {
          onInput(event)
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onInput, searchButtonRef])

  useEffect(() => {
    setModifierKey(
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl ',
    )
  }, [])

  return (
    <button
      className="group flex h-6 w-6 items-center justify-center sm:justify-start md:h-auto md:w-80 md:flex-none md:rounded-lg md:py-2.5 md:pl-4 md:pr-3.5 md:text-sm md:ring-1 md:ring-slate-200 md:hover:ring-slate-300 dark:md:bg-slate-800/75 dark:md:ring-inset dark:md:ring-white/5 dark:md:hover:bg-slate-700/40 dark:md:hover:ring-slate-500 lg:w-96"
      type="button"
      ref={searchButtonRef}
      onClick={onOpen}
      {...props}
    >
      <SearchIcon className="h-5 w-5 flex-none fill-slate-400 group-hover:fill-slate-500 dark:fill-slate-500 md:group-hover:fill-slate-400" />
        <span className="sr-only md:not-sr-only md:ml-2 md:text-slate-500 md:dark:text-slate-400">
          Search docs
        </span>
        {modifierKey && (
          <kbd className="ml-auto hidden font-medium text-slate-400 dark:text-slate-500 md:block">
            <kbd className="font-sans">{modifierKey}</kbd>
            <kbd className="font-sans">K</kbd>
          </kbd>
        )}
    </button>
  )
}

function useDocSearchKeyboardEvents({ isOpen, onOpen, onClose }) {
  useEffect(() => {
    function onKeyDown(event) {
      function open() {
        // We check that no other DocSearch modal is showing before opening
        // another one.
        if (!document.body.classList.contains('DocSearch--active')) {
          onOpen()
        }
      }

      if (
        (event.keyCode === 27 && isOpen) ||
        (event.key === 'k' && (event.metaKey || event.ctrlKey)) ||
        (!isEditingContent(event) && event.key === '/' && !isOpen)
      ) {
        event.preventDefault()

        if (isOpen) {
          onClose()
        } else if (!document.body.classList.contains('DocSearch--active')) {
          open()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onOpen, onClose])
}

function isEditingContent(event) {
  let element = event.target
  let tagName = element.tagName
  return (
    element.isContentEditable ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA'
  )
}
