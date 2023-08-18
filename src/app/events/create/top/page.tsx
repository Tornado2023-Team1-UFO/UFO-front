import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <button>
        <Link href='/events/create'>作成スタート</Link>
      </button>
    </div>
  )
}
