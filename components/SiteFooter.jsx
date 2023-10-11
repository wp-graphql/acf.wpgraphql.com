import clsx from 'clsx'

export function SiteFooter({ navigation }) {
    return (
      <footer className={clsx('flex flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8')}>
        <p>Footer</p>
      </footer>
    )
}