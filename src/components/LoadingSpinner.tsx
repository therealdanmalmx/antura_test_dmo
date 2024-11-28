import MoonLoader from "react-spinners/MoonLoader";
import { LoadingSpinnerProps } from "../types/types";

const LoadingSpinner = ({ color, loading, size }: LoadingSpinnerProps) => {
  return (
    <MoonLoader
      color={color}
      loading={loading}
      size={size}
      aria-label='Loading Spinner'
      data-testid='loader'
    />
  );
};

export default LoadingSpinner;
