import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function MobileSection() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl text-center font-bold mt-7">
          Your One Stop <br /> Cleaning Center
        </h1>
      </div>
      <div className="mt-7 px-8 w-full">
        <Button className="text-white w-full">Booking from $80</Button>
      </div>
      <div>
        <img src="./illu4.png" className="object-cover mt-3" />
      </div>
      <div className="flex w-full px-6 mt-10">
        <h1 className="text-3xl text-start font-bold">
          Why Choose <br /> Shield ?
        </h1>
      </div>
      <div className="flex w-full px-6 mt-4">
        <p className="text-left font-light">
          We understand your home is important to you. That&apos;s why we focus
          on the quality of the cleaner. Our cleaners aren&apos;t contract
          workers - they are full-time employees. They care as much as we do.
        </p>
      </div>
        <Carousel className="flex w-full px-6 mt-4 items-center justify-center">
          <CarouselContent>
            <CarouselItem className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <img src="./content1.png" alt="" />
                <h1 className="text-2xl font-semibold text-primary">BOOK</h1>
                <p className="font-regular text-neutral-400 text-center mt-4">
                  Tell us when and where you want your cleaning.
                </p>
              </div>
            </CarouselItem>
            <CarouselItem className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <img src="./content2.png" alt="" />
                <h1 className="text-2xl font-semibold text-primary">CLEAN</h1>
                <p className="font-regular text-neutral-400 text-center mt-4">
                  A Professional cleaner comes over and cleans your place.
                </p>
              </div>
            </CarouselItem>
            <CarouselItem className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <img src="./content3.png" alt="" />
                <h1 className="text-2xl font-semibold text-primary">FREEDOM</h1>
                <p className="font-regular text-neutral-400 text-center mt-4">
                  Enjoy your life and come back to a clean space!.
                </p>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      
    </div>
  );
}
