import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import { cn, normalizeCreationDate } from "@/lib/utils";
import NotificationItem from "./NotificationItem";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Notifications = () => {
  const notifications = useQuery(api.notifications.get);
  const [firstLoadingItem, setFirstLoadingItem] = useState<boolean>(true);
  const prevFilteredLength = useRef<number>(0);
  const { toast } = useToast();

  // To filter notifications which is not published by current user
  const filterNotifications = () => {
    if (!notifications) return [];

    const token = localStorage.getItem("token") as string;
    if (!token) return [];

    const verifiedDecoded = jwtDecode(token) as JwtPayload & {
      username: string
    };
    const { username: publisher } = verifiedDecoded;
    return notifications.filter(noti => noti.publisher !== publisher);
  }

  // To handle popup a toast to noti new video shared
  useEffect(() => {
    if (notifications && firstLoadingItem) {
      setFirstLoadingItem(false);
      prevFilteredLength.current = filterNotifications().length;
    }

    if (notifications && !firstLoadingItem) {
      const currentFilteredLength = filterNotifications().length;

      // To check whether user receives a new notification
      if (currentFilteredLength > prevFilteredLength.current) {
        const lastestNotification = filterNotifications()[0];
        toast({
          title: lastestNotification.title,
          description: lastestNotification.description,
        })
      }

      // Update new notifications length into prev length
      prevFilteredLength.current = currentFilteredLength;
    }
  }, [notifications])

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="relative">
            <Bell className="text-sm cursor-pointer" />
            <Badge className="absolute -top-3 -right-3 rounded-full px-2" variant={"destructive"}>{filterNotifications().length}</Badge>
          </div>
        </PopoverTrigger>
        <PopoverContent className={cn("p-0", filterNotifications().length === 0 && "hidden")}>
          <div className="w-full max-h-96 overflow-scroll">
            {filterNotifications().map(({_id, title, description, url, _creationTime}) => (
              <NotificationItem
                key={_id}
                id={_id}
                url={url}
                title={title}
                description={description}
                date={normalizeCreationDate(_creationTime)}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default Notifications;
