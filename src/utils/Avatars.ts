export const AvatarUrl = 'https://api.adorable.io/avatars/285';

export const getMyAvatar = (id: string): string => {
  return `${AvatarUrl}/${id}.png`;
};
