import { useState } from "react";
// YetLighbox
// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";
// import Video from "yet-another-react-lightbox/plugins/video";

// FsLightbox
import FsLightbox from "fslightbox-react";

function TestLightbox(){
  const [open, setOpen] = useState(false)

  return (
    <>
      <h1>Lighbox library testing</h1>
      <button onClick={()=> setOpen(!open)}>Display video</button>
      {
        open && (
          <p>is open</p>
        )
      }
      {/* <Lightbox
        open={open}
        onClose={()=> setOpen(false)}
        plugins={[Video]}
        carousel={{ finite: true }}
        buttonNext={undefined}
        slides={[
          {
            type: "video",
            width: 720,
            height: 480,
            autoPlay: true,
            poster: "/public/poster-image.jpg",
            sources: [
              {
                src: "test.webm",
                type: "video/mp4"
              }
            ]
          },
        ]}
      /> */}
      <FsLightbox
        toggler={open}
        sources={['test.webm', 'new.mp4']}
      />
    </>
  )
}

export default TestLightbox