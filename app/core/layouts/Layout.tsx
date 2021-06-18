import { ReactNode } from "react"
import { Head } from "blitz"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "syndicate"}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="bg-gray-100 w-screen min-h-screen">
        <div className="bg-blue-600 flex items-center justify-center">
          <div className="text-5xl p-2 text-white font-extrabold">
            <p style={{ fontFamily: "'Amatic SC', cursive;" }}>Betting & Abuse</p>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}

export default Layout
