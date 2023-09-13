import Image from "next/image";

const Loading = () => {
  return (
    <div
      style={{
        textAlign:'center',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Image alt="loading" src={"/loading.gif"} width={80} height={80} />
    </div>
  );
};

export default Loading;
