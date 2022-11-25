import { useState, useEffect } from "react";

export default function defer(Component) {
  function Defer(props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    return <Component mounted={mounted} {...props} />;
  }

  return Defer;
}