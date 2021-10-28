// import imagemin from "imagemin";
// import imageminMozjpeg from "imagemin-mozjpeg";
// import imageminPngquant from "imagemin-pngquant";

// export const imageCompressor = async (
//   imageUrl: string
// ): Promise<{ success: boolean }> => {
//   const res = await imagemin([`assets/${imageUrl}`], {
//     destination: "compressed/",
//     plugins: [
//       imageminMozjpeg(),
//       imageminPngquant({
//         quality: [0.6, 0.8],
//       }),
//     ],
//   })
//     .then((resp) => {
//       console.log(resp);
//       return { success: true };
//     })
//     .catch((err) => ({ success: false }));
//   return res;
// };
