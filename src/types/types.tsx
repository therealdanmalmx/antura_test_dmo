export interface UserProfileTypes {
  results: [
    {
      id: {
        value: string;
      };
      name: {
        first: string;
        last: string;
      };
      location: {
        city: string;
        state: string;
        country: string;
      };
      email: string;
      cell: string;
      picture: {
        large: string;
      };
    }
  ];
}

export interface LoadingSpinnerProps {
  color: string;
  loading: boolean;
  size: number;
}
