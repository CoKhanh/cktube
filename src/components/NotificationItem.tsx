import Link from "next/link"

export interface NotificationItemProps {
  id: string;
  url: string;
  title: string;
  description: string;
  date: string;
}

const NotificationItem = ({ id, title, description, url, date }: NotificationItemProps) => {
  return (
    <Link key={id} href={url} target="_blank" passHref>
      <div className="w-full p-4 hover:bg-slate-200 cursor-pointer">
        <p className="font-bold">{title}</p>
        <p className="text-sm overflow-clip text-nowrap truncate">{description}</p>
        <p className="text-sm">Date: {date}</p>
      </div>
    </Link>
  )
}

export default NotificationItem;
