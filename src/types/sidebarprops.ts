export interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}