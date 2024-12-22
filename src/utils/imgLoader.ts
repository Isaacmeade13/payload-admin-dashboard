type ImgLoaderProps = {
  src: string;
};

const imgLoader = ({ src }: ImgLoaderProps): string =>
  `${process.env.NEXT_PUBLIC_API_V1_ENDPOINT_IMAGE}${src}`;
export { imgLoader };
