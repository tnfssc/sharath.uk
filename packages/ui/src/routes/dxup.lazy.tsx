import { createLazyFileRoute } from '@tanstack/react-router';
import Autoplay from 'embla-carousel-autoplay';

import dxupImg1 from '@/assets/images/dxup/1.png';
import dxupImg2 from '@/assets/images/dxup/2.png';
import dxupImg3 from '@/assets/images/dxup/3.png';
import dxupImg4 from '@/assets/images/dxup/4.png';
import dxupImg5 from '@/assets/images/dxup/5.png';
import { PageWrapper } from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Typography } from '@/components/ui/typography';

export const Route = createLazyFileRoute('/dxup')({
  component: Dxup,
});

const downloadLinkLinux = 'https://miniofiles.sharath.uk/dxup/dxup-linux-amd64.deb';
const downloadLinkMacos = 'https://miniofiles.sharath.uk/dxup/dxup-macos-aarch64.dmg';

function Dxup() {
  return (
    <PageWrapper className="pb-24">
      <div>
        <Typography variant="h1" className="my-8 w-full text-center">
          dxup
        </Typography>
        <Typography variant="p" className="my-8 w-full text-center">
          A toolchain manager made with Tauri. Powered by asdf.
        </Typography>
      </div>
      <div className="grid place-items-center">
        <div className="w-[80vw]">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              {[dxupImg1, dxupImg2, dxupImg3, dxupImg4, dxupImg5].map((img) => (
                <CarouselItem key={img} className="max-w-2xl w-[80vw]">
                  <div
                    style={{ backgroundImage: `url(${img})`, aspectRatio: 1704 / 1378, backgroundSize: 'cover' }}
                    className="h-full"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center p-4">
        <Typography variant="h4" className="my-4 w-full text-center">
          Download now
        </Typography>
        <div className="flex">
          <a href={downloadLinkLinux} target="_blank" rel="noreferrer">
            <Button className="flex items-center gap-1 b-r rounded-r-0">
              <i className="i-mdi-linux h-4 w-4" />
              linux.deb
            </Button>
          </a>
          <a href={downloadLinkMacos} target="_blank" rel="noreferrer">
            <Button className="flex items-center gap-1 b-l rounded-l-0">
              <i className="i-ic-baseline-apple h-4 w-4" />
              macos.dmg
            </Button>
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}
