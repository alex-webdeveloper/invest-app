import Link from "next/link"

export default function Footer() {

  return (
    <footer>
      <div className="h-[100px] p-16 mt-5 flex justify-center items-center border-t-2 border-foreground border-solid">
        Автор:&nbsp;
        <Link
          href="https://github.com/alex-webdeveloper"
          className="text-foreground hover:text-stone-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Alex-webdeveloper
        </Link>
      </div>
    </footer>
  )
}