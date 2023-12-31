import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="relative bottom-0 flex flex-col items-center justify-center gap-2 bg-neutral-600 py-10">
      <Image
        src={'/assets/logo.svg'}
        alt={'Logo Smart Fit'}
        width={100}
        height={40}
        priority
      />
      <p className="text-sm text-background">
        Todos os direitos reservados - 2023
      </p>
    </footer>
  )
}

export default Footer
