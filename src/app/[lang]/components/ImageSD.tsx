import { ImageJsonLd } from "next-seo";

interface PictureJSON {
data:{
        image: string;
        altText: string;
};
  }
  
    export default function ImageSD(data:PictureJSON) {
    console.log(data.data.image);

    return (
        <>
          
          <ImageJsonLd
          useAppDir={true}
            images={[
              {
                contentUrl: `${data.data.image}`,
                creator: {
                  '@type': 'Organisation',
                  name: 'Atkans',
                },
                // creditText: 'Jane Doe',
                // copyrightNotice: '© Jane Doe',
                // license: 'http://www.example.com/license',
                // acquireLicensePage: 'http://www.example.com/acquire-license',
              },
            ]}
          />
        </>
      );
}