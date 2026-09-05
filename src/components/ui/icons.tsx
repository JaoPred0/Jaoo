/* oxlint-disable react/only-export-components -- catálogo central de ícones da interface */
import {
  Add01Icon,
  Alert02Icon,
  Analytics01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  ArrowUp01Icon,
  Cancel01Icon,
  CreditCardIcon,
  Copy01Icon,
  Delete02Icon,
  File01Icon,
  FloppyDiskIcon,
  Folder01Icon,
  GridViewIcon,
  GoogleIcon,
  Home01Icon,
  Link01Icon,
  Loading03Icon,
  PaintBrush01Icon,
  QrCode01Icon,
  Share01Icon,
  Menu01Icon,
  Search01Icon,
  Settings01Icon,
  Shield01Icon,
  SparklesIcon,
  UserIcon,
  ViewIcon,
} from '@hugeicons/core-free-icons'
import {
  HugeiconsIcon,
  type HugeiconsIconProps,
  type IconSvgElement,
} from '@hugeicons/react'

type IconProps = Omit<HugeiconsIconProps, 'icon'>
const makeIcon = (icon: IconSvgElement) =>
  function JaooIcon({ strokeWidth = 1.8, ...props }: IconProps) {
    return <HugeiconsIcon icon={icon} strokeWidth={strokeWidth} {...props} />
  }

export const Home = makeIcon(Home01Icon)
export const Google = makeIcon(GoogleIcon)
export const FolderKanban = makeIcon(Folder01Icon)
export const Link2 = makeIcon(Link01Icon)
export const CreditCard = makeIcon(CreditCardIcon)
export const Copy = makeIcon(Copy01Icon)
export const Trash = makeIcon(Delete02Icon)
export const Settings = makeIcon(Settings01Icon)
export const Paintbrush = makeIcon(PaintBrush01Icon)
export const QrCode = makeIcon(QrCode01Icon)
export const Share = makeIcon(Share01Icon)
export const UserRound = makeIcon(UserIcon)
export const Shield = makeIcon(Shield01Icon)
export const ShieldCheck = makeIcon(Shield01Icon)
export const Menu = makeIcon(Menu01Icon)
export const X = makeIcon(Cancel01Icon)
export const Plus = makeIcon(Add01Icon)
export const Search = makeIcon(Search01Icon)
export const ArrowRight = makeIcon(ArrowRight01Icon)
export const ArrowLeft = makeIcon(ArrowLeft01Icon)
export const ArrowDown = makeIcon(ArrowDown01Icon)
export const ArrowUp = makeIcon(ArrowUp01Icon)
export const ArrowUpRight = makeIcon(ArrowUpRight01Icon)
export const BarChart3 = makeIcon(Analytics01Icon)
export const Boxes = makeIcon(GridViewIcon)
export const Sparkles = makeIcon(SparklesIcon)
export const Save = makeIcon(FloppyDiskIcon)
export const LoaderCircle = makeIcon(Loading03Icon)
export const AlertTriangle = makeIcon(Alert02Icon)
export const FileStack = makeIcon(File01Icon)
export const ExternalLink = makeIcon(ArrowUpRight01Icon)
export const Eye = makeIcon(ViewIcon)
