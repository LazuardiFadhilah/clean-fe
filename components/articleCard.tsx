interface ArticleCardProps {
  image: string;
  title: string;
  description: string;
  authorImage: string;
  authorName: string;
  date: string;
}

export default function ArticleCard({
  image,
  title,
  description,
  authorImage,
  authorName,
  date,
}: ArticleCardProps) {
  return (
    <div className="flex flex-col mx-9 mt-9 rounded-xl bg-white">
      <div className="flex">
        <img src={image} className="object-cover w-full rounded-t-xl" />
      </div>
      <div className="flex flex-col px-4 py-4">
        <h1 className="text-xl font-semibold text-neutral-100">{title}</h1>
        <p className="text-neutral-500 font-light mt-2">{description}</p>
        <div className="flex flex-row mt-3 items-center">
          <img
            src={authorImage}
            className="w-8 h-8 rounded-full object-cover object-top"
          />
          <div className="flex flex-col mx-2.5">
            <h1 className="text-sm font-bold text-neutral-100">{authorName}</h1>
            <p className="text-sm text-light text-neutral-500">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}