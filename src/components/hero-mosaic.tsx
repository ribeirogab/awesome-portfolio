import Image from "next/image";
import type { Photo } from "@/schema/portfolio";

type HeroMosaicProps = {
	photos: Photo[];
};

export function HeroMosaic({ photos }: HeroMosaicProps) {
	return (
		<div className="hero-mosaic">
			{photos.map((photo, index) => (
				<figure className="photo" key={photo.src}>
					<Image
						className="photo-img"
						src={photo.src}
						alt={photo.alt}
						fill
						sizes="(max-width: 700px) 100vw, 640px"
						priority={index === 0}
						unoptimized
					/>
				</figure>
			))}
		</div>
	);
}
