import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
const PageTransition = ({ children }) => {
    return (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 }, className: "min-h-[calc(100vh-80px)]", children: children }));
};
export default PageTransition;
