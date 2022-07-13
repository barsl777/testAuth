import { Route, Routes, useLocation } from "react-router-dom";
import Form from "./Form.js";
import { Users } from "./Users.js";
import PageNotFound from "./PageNotFound.js";
import { useTransition, animated } from "react-spring";

export default function App() {
  const location = useLocation();
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: "translate3d(100px, -100px, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
    leave: { opacity: 0, transform: "translate3d(100px, -100px, 0)" }
  });
  return transitions((props, item) => (
    <animated.div style={props}>
      <Routes location={item}>
        <Route path="/" element={<Form />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </animated.div>
  ));
}
