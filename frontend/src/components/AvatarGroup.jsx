function AvatarGroup({ avatars, maxVisible }) {
  return (
    <div className="flex items-center">
      {avatars.slice(0, maxVisible).map((avatar, index) => {
        return (
          <p
            key={index}
            className="flex justify-center items-center w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0 text-xl font-semibold capitalize bg-gray-200"
          >
            {avatar.charAt(0)}
          </p>
        );
      })}

      {avatars.length > maxVisible && (
        <div className="w-9 h-9 flex items-center justify-center bg-orange-50 text-sm font-medium rounded-full border-2 border-white -ml-3">
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  );
}

export default AvatarGroup;
