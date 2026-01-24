import { motion } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({
    children,
    variant = 'primary',
    className,
    icon: Icon,
    ...props
}) => {

    const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-text-main text-white hover:bg-black shadow-lg hover:shadow-xl hover:-translate-y-1",
        secondary: "bg-white text-text-main border-2 border-gray-200 hover:border-primary hover:text-primary hover:bg-surface-secondary",
        gradient: "bg-primary text-white shadow-lg hover:shadow-xl hover:-translate-y-1",
        outline: "bg-transparent border border-white/30 text-white hover:bg-white/10",
        ghost: "bg-transparent text-text-secondary hover:text-primary hover:bg-primary/5"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={twMerge(baseStyles, variants[variant], className)}
            {...props}
        >
            {Icon && <Icon size={20} />}
            {children}
        </motion.button>
    );
};

export default Button;
