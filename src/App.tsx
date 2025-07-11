import Sidebar from "./sidebar";

export function App({ children }: { children: React.ReactNode }) {
  return <Sidebar>{children}</Sidebar>;
}

export default App;
