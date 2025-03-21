import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect, createContext } from "react";

// Create theme context (simplified to only dark mode)
export const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Always use dark mode for futuristic UI
  const theme = "dark";
  const toggleTheme = () => {}; // Empty function since we're always using dark mode
  
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen transition-colors duration-300 bg-gradient-to-b from-gray-900 to-gray-950">
          <Router />
          <Toaster />
        </div>
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}

export default App;
