import { cn } from '../../utils/cn';
import PropTypes from 'prop-types';

const Card = ({ className, ...props }) => (
    <div
        className={cn(
            "rounded-lg border bg-card text-card-foreground shadow-sm",
            className
        )}
        {...props}
    />
);

Card.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

const CardHeader = ({ className, ...props }) => (
    <div
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
);

CardHeader.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

const CardTitle = ({ className, ...props }) => (
    <h3
        className={cn(
            "text-2xl font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
);

CardTitle.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

const CardContent = ({ className, ...props }) => (
    <div className={cn("p-6 pt-0", className)} {...props} />
);

CardContent.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

export { Card, CardHeader, CardTitle, CardContent };