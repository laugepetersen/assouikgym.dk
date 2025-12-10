import { CMSLink } from '@/components/Link'
import TextHighlight from '@/components/ui/texthighlightbold'
import { getStaticGlobal } from '@/data/staticData'
import type { Footer } from '@/payload-types'
import Image from 'next/image'

export async function Footer() {
  const footerData = getStaticGlobal<Footer>('footer')

  if (!footerData) {
    // Return minimal footer if no data
    return (
      <footer className="mt-auto bg-white">
        <div className="p-4">
          <div className="black-gradient-bg text-white pt-12 px-4 md:px-12 rounded-2xl backdrop-blur-lg">
            <div className="text-center mt-8 md:mt-12">
              <div className="font-[450] leading-none tracking-[2%] bg-gradient-to-b from-neutral-600/80 to-transparent text-transparent bg-clip-text pb-3 w-full text-4xl sm:text-5xl md:text-6xl text-center mx-auto px-4 lg:w-[947px] lg:text-[160px] lg:text-nowrap">
                Assouik Gym
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  const logoUrl =
    typeof footerData?.topSection?.logo === 'object' && footerData?.topSection?.logo?.url
      ? footerData.topSection.logo.url
      : '/assets/images/footer_logo.png'

  return (
    <footer className="mt-auto bg-white">
      {/* Top section with logo and announcement */}
      <div className="py-12 text-center">
        <div className="container mx-auto px-4">
          <div className="w-24 h-24 mx-auto mb-6 bg-beige rounded-[1.7rem] flex items-center justify-center p-4">
            <Image
              src={logoUrl}
              alt="SportSolution Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>

          <h2 className="text-3xl font-semibold mb-4">
            <TextHighlight
              text={footerData?.topSection?.heading || 'Vi bruger SportSolution til holdtilmelding'}
            />
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed text-lg">
            {footerData?.topSection?.description ||
              'Deep LaCroix-denim xoxo godard. Small retina v-3 moon air cardigan bear-humblebreg meditation level. Trust carry-on chia fancy lo-fi boys.'}
          </p>

          {footerData?.topSection?.links && footerData.topSection.links.length > 0 && (
            <div className="mt-6 sm:mt-8 w-full flex flex-col items-center">
              {footerData.topSection.links.map(({ link }, i) => (
                <div key={i} className="mb-3">
                  <CMSLink {...link} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dark bottom section */}
      <div className="p-4">
        <div className="black-gradient-bg text-white pt-12 px-4 md:px-12 rounded-2xl backdrop-blur-lg">
          <div className="mx-auto">
            {/* Mobile-only contact display */}
            <div className="md:hidden flex flex-col items-center space-y-3 mb-8">
              <div className="grid grid-cols-1 gap-4 mb-8">
                <div className="flex flex-col text-center">
                  <span className="text-base text-white mb-1">Email</span>
                  <span>{footerData?.contactInfo?.email || 'info@assouilkgym.dk'}</span>
                </div>

                <div className="flex flex-col text-center">
                  <span className="text-base text-white mb-1">Telefon</span>
                  <span>{footerData?.contactInfo?.phone || '+45 12 34 56 78'}</span>
                </div>

                <div className="flex flex-col text-center">
                  <span className="text-base text-white mb-1">CVR</span>
                  <span>{footerData?.contactInfo?.cvr || '41254335'}</span>
                </div>

                <div className="flex flex-col text-center">
                  <span className="text-base text-white mb-1">Adresse</span>
                  <span>
                    {footerData?.contactInfo?.address || 'Frederiksundsvej 342, 2700 København'}
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop-only contact display */}
            <div className="hidden md:flex justify-center gap-6 mb-8 text-center">
              <span>{footerData?.contactInfo?.email || 'info@assouilkgym.dk'}</span>
              <span className="mx-2">·</span>
              <span>{footerData?.contactInfo?.phone || '+45 12 34 56 78'}</span>
              <span className="mx-2">·</span>
              <span>Cvr {footerData?.contactInfo?.cvr || '41254335'}</span>
              <span className="mx-2">·</span>
              <span>
                {footerData?.contactInfo?.address || 'Frederiksundsvej 342, 2700 København'}
              </span>
            </div>

            {/* Responsive watermark text */}
            <div className="text-center mt-8 md:mt-12">
              <div
                className="
      font-[450] 
      leading-none 
      tracking-[2%] 
      bg-gradient-to-b from-neutral-600/80 to-transparent text-transparent bg-clip-text 
      pb-3 
      w-full
      text-4xl
      sm:text-5xl
      md:text-6xl
      text-center
      mx-auto
      px-4
      lg:w-[947px]
      lg:text-[160px]
      lg:text-nowrap
    "
              >
                {footerData?.brandName || 'Assouik Gym'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
