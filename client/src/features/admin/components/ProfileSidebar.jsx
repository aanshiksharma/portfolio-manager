import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
  ItemActions,
} from "@/components/ui/item";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { Mail, Phone } from "lucide-react";

import Icon from "@/shared/components/ui/Icon";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSidebarSkeleton = () => {
  return (
    <aside>
      <ItemGroup>
        <Item>
          <ItemHeader>
            <Skeleton className="max-w-2xs w-full aspect-square" />
          </ItemHeader>
          <ItemContent>
            <Skeleton className="w-30 h-3" />
            <Skeleton className="w-10 h-2 mt-1" />
          </ItemContent>
        </Item>

        <Separator />

        <Item>
          <ItemContent>
            <ItemTitle>Contact</ItemTitle>

            <ul className="grid gap-2 mt-3">
              <li>
                <Skeleton className="w-full h-3" />
              </li>
              <li>
                <Skeleton className="w-3/4 h-3" />
              </li>
            </ul>
          </ItemContent>
        </Item>

        <Item>
          <ItemContent>
            <ItemTitle>Social Media</ItemTitle>

            <ItemActions className={"mt-3"}>
              {Array.from(new Array(3)).map((social) => (
                <Button variant="ghost" size="icon" asChild>
                  <Skeleton className="w-8 h-8" />
                </Button>
              ))}
            </ItemActions>
          </ItemContent>
        </Item>
      </ItemGroup>
    </aside>
  );
};

export const ProfileSidebar = ({ admin, className }) => {
  return (
    <aside className={`${className}`}>
      <ItemGroup>
        <Item>
          <ItemHeader>
            <ItemMedia variant="image" className="size-full max-w-2xs">
              <img src={admin.profileImage.url} alt="" />
            </ItemMedia>
          </ItemHeader>
          <ItemContent>
            <ItemTitle>{admin.name}</ItemTitle>
            <ItemDescription>Admin</ItemDescription>
          </ItemContent>
        </Item>

        <Separator />

        <Item>
          <ItemContent>
            <ItemTitle>Contact</ItemTitle>

            <ul className="grid gap-2 mt-3">
              <li>
                <a
                  href={`mailto:${admin.email}`}
                  className="flex gap-2 items-center"
                >
                  <Mail size={16} />
                  <span>{admin.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${admin.mobile}`}
                  className="flex gap-2 items-center"
                >
                  <Phone size={16} />
                  <span>{admin.mobile}</span>
                </a>
              </li>
            </ul>
          </ItemContent>
        </Item>

        <Item>
          <ItemContent>
            <ItemTitle>Social Media</ItemTitle>

            <ItemActions className={"mt-3"}>
              {admin.socialMediaLinks.map((social) => (
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={social.link} target="_blank">
                        <Icon icon={social.platform.toLowerCase()} />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    View {admin.name.split(" ")[0]}'s {social.platform}
                  </TooltipContent>
                </Tooltip>
              ))}
            </ItemActions>
          </ItemContent>
        </Item>
      </ItemGroup>
    </aside>
  );
};

export default ProfileSidebar;
