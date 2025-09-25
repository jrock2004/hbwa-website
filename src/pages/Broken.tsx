export default function Broken() {
  throw Error("This page is broken on purpose", {
    cause: { info: "You found the broken page. Congrats!" },
  });

  return <></>;
}
