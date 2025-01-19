import { cn } from '../../utils/cn';
import PropTypes from 'prop-types';

const Alert = ({ className, children, ...props }) => {
    return (
        <div
            role="alert"
            className={cn(
                "rounded-lg border p-4 bg-background/80 backdrop-blur-sm",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

Alert.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

export { Alert };
