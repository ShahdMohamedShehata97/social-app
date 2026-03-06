// import React, { useState, useRef } from "react";
// import { useQueryClient, useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { FaGlobeAmericas, FaRegImage, FaRegSmile } from "react-icons/fa";
// import { IoIosArrowDown, IoMdClose } from "react-icons/io";
// import { IoSend } from "react-icons/io5";

// export default function EditPost({ postInfo, queryKey, setIsEditing }) {

//   if (!postInfo) return null;

//   const { id, user, body, image } = postInfo;

//   const captionInput = useRef();
//   const imageInput = useRef();

//   const [imagePreview, setImagePreview] = useState(image || null);

// const [removeImage, setRemoveImage] = useState(false);
//   const queryClient = useQueryClient();


//   // تغيير الصورة
//   function handleChangeImage(e) {
//     const file = e.target.files[0];
//     if (!file) return;

//     setImagePreview(URL.createObjectURL(file));
//   }

//   // حذف الصورة
// //   function handleClearImage() {
// //     setImagePreview(null);
// //     imageInput.current.value = "";
// //   }

// function handleClearImage() {
//   setImagePreview(null);
//   setRemoveImage(true);
//   imageInput.current.value = "";
// }

//   function handleCancel() {
//   captionInput.current.value = body;   // يرجع النص الأصلي
//   setImagePreview(image || null);      // يرجع الصورة الأصلية
//   imageInput.current.value = "";       // يفضي input
//   setIsEditing(false);                 // يقفل edit mode
// }

//   // تحديث البوست
// //   function handleUpdatePost() {

// //     const postObj = new FormData();

// //     if (captionInput.current.value) {
// //       postObj.append("body", captionInput.current.value);
// //     }

// //     if (imageInput.current.files[0]) {
// //       postObj.append("image", imageInput.current.files[0]);
// //     }

// //     return axios.put(
// //       `https://route-posts.routemisr.com/posts/${id}`,
// //       postObj,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("tkn")}`,
// //         },
// //       }
// //     );
// //   }

// // function handleUpdatePost() {

// //   const postObj = new FormData();

// //   if (captionInput.current.value) {
// //     postObj.append("body", captionInput.current.value);
// //   }

// //   // لو المستخدم اختار صورة جديدة
// //   if (imageInput.current.files[0]) {
// //     postObj.append("image", imageInput.current.files[0]);
// //   }

// //   // لو مفيش صورة جديدة لكن فيه صورة قديمة
// //   else if (imagePreview && image) {
// //     postObj.append("image", image);
// //   }

// //   return axios.put(
// //     `https://route-posts.routemisr.com/posts/${id}`,
// //     postObj,
// //     {
// //       headers: {
// //         Authorization: `Bearer ${localStorage.getItem("tkn")}`,
// //       },
// //     }
// //   );
// // }


// function handleUpdatePost() {

//   const postObj = new FormData();

//   // تحديث النص
//   if (captionInput.current.value) {
//     postObj.append("body", captionInput.current.value);
//   }

//   // فقط لو المستخدم اختار صورة جديدة
//   if (imageInput.current.files[0]) {
//     postObj.append("image", imageInput.current.files[0]);
//   }

//   return axios.put(
//     `https://route-posts.routemisr.com/posts/${id}`,
//     postObj,
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("tkn")}`,
//       },
//     }
//   );
// }

//   const { mutate: updateMutation, isPending } = useMutation({
//     mutationFn: handleUpdatePost,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey });
//       setIsEditing(false);
//     },
//   });

//   return (
//     <div className="w-full bg-white rounded-xl border border-gray-300 shadow-sm p-4">

//       {/* Header */}
//       <div className="flex items-center gap-3 mb-4">
//         <img
//           src={user.photo}
//           alt="User avatar"
//           className="w-11 h-11 rounded-full object-cover"
//         />

//         <div className="flex flex-col">
//           <span className="font-bold text-[17px]">
//             {user.name}
//           </span>

//           <button className="flex items-center gap-1 bg-[#e4e6eb] px-2 py-0.5 rounded-md text-[13px]">
//             <FaGlobeAmericas size={12} />
//             <span>Public</span>
//             <IoIosArrowDown size={14} />
//           </button>
//         </div>
//       </div>

//       {/* Textarea */}
//       <div className="mb-3 bg-[#F8FAFC] p-2.5 rounded-2xl border">
//         <textarea
//           ref={captionInput}
//           defaultValue={body}
//           placeholder={`What's on your mind, ${user.name.split(" ")[0]}?`}
//           className="w-full min-h-24 resize-none border-none text-[20px] outline-none bg-transparent"
//         />
//       </div>

//       {/* Image preview */}
//       {imagePreview && (
//         <div className="relative mb-4">

//           <button
//             onClick={handleClearImage}
//             className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
//           >
//             <IoMdClose size={20} />
//           </button>

//           <img
//             src={imagePreview}
//             className="w-full h-64 object-cover rounded-lg border"
//           />
//         </div>
//       )}

//       <hr className="mb-3" />

//       {/* Footer */}
//       {/* <div className="flex items-center justify-between">

//         <div className="flex gap-2">

//           <label
//             htmlFor="photo"
//             className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer"
//           >
//             <FaRegImage className="text-[#45bd62]" size={20} />
//             <span className="text-[15px]">Photo/video</span>
//           </label>

//           <input
//             type="file"
//             id="photo"
//             hidden
//             ref={imageInput}
//             onChange={handleChangeImage}
//           />

//           <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg">
//             <FaRegSmile className="text-[#f7b928]" size={20} />
//             <span className="text-[15px]">Feeling/activity</span>
//           </button>

//         </div>

//         <button
//           onClick={updateMutation}
//           disabled={isPending}
//           className="bg-[#1b74e4] text-white px-8 py-2 rounded-lg font-bold flex items-center gap-2"
//         >
//           Post
//           <IoSend size={16} />
//         </button>

//       </div> */}

//       <div className="flex items-center justify-between">

//   <div className="flex gap-2">

//     <label
//       htmlFor="photo"
//       className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer"
//     >
//       <FaRegImage className="text-[#45bd62]" size={20} />
//       <span className="text-[15px]">Photo/video</span>
//     </label>

//     <input
//       type="file"
//       id="photo"
//       hidden
//       ref={imageInput}
//       onChange={handleChangeImage}
//     />

//     <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg">
//       <FaRegSmile className="text-[#f7b928]" size={20} />
//       <span className="text-[15px]">Feeling/activity</span>
//     </button>

//   </div>

//   <div className="flex gap-2">
    
//     {/* Cancel */}
//     <button
//       onClick={handleCancel}
//       className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg font-semibold"
//     >
//       Cancel
//     </button>

//     {/* Update */}
//     <button
//       onClick={updateMutation}
//       disabled={isPending}
//       className="bg-[#1b74e4] text-white px-8 py-2 rounded-lg font-bold flex items-center gap-2"
//     >
//       Update
//       <IoSend size={16} />
//     </button>

//   </div>

// </div>
//     </div>
//   );
// }



import React, { useState, useRef } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FaGlobeAmericas, FaRegImage, FaRegSmile } from "react-icons/fa";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";

export default function EditPost({ postInfo, queryKey, setIsEditing }) {
  if (!postInfo) return null;

  const { id, user, body, image } = postInfo;
  const captionInput = useRef();
  const imageInput = useRef();

  const [imagePreview, setImagePreview] = useState(image || null);
  const [removeImage, setRemoveImage] = useState(false);
  const queryClient = useQueryClient();

  // تغيير الصورة
  function handleChangeImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setRemoveImage(false); // لو اختر صورة جديدة يبقى مش مسح
  }

  // حذف الصورة
  function handleClearImage() {
    setImagePreview(null);
    setRemoveImage(true);
    imageInput.current.value = "";
  }

  // إلغاء التعديل
  function handleCancel() {
    captionInput.current.value = body;
    setImagePreview(image || null);
    imageInput.current.value = "";
    setRemoveImage(false);
    setIsEditing(false);
  }

  // تحديث البوست
//   function handleUpdatePost() {
//     const postObj = new FormData();

//     // النص
//     if (captionInput.current.value) {
//       postObj.append("body", captionInput.current.value);
//     }

//     // لو اختار صورة جديدة
//     if (imageInput.current.files[0]) {
//       postObj.append("image", imageInput.current.files[0]);
//     }

//     // لو مسح الصورة
//     if (removeImage) {
//       postObj.append("removeImage", true); // مهم: لازم الـ API يقراه
//     }

//     return axios.put(`https://route-posts.routemisr.com/posts/${id}`, postObj, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("tkn")}`,
//       },
//     });
//   }


const handleUpdatePost = async () => {
  const formData = new FormData();
  formData.append("body", captionInput.current.value || "");

  const file = imageInput.current.files[0];
  if (file) {
    formData.append("image", file); // لاحظي الاسم هنا ممكن يحتاج تغيير حسب API
  }

  if (removeImage) {
    formData.append("removeImage", "true"); // stringify بدل boolean
  }

  const token = localStorage.getItem("tkn");
  return await axios.put(
    `https://route-posts.routemisr.com/posts/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
  const { mutate: updateMutation, isPending } = useMutation({
    mutationFn: handleUpdatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setIsEditing(false);
    },
  });

  return (
    <div className="w-full bg-white rounded-xl border border-gray-300 shadow-sm p-4">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={user.photo}
          alt="User avatar"
          className="w-11 h-11 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-bold text-[17px]">{user.name}</span>
          <button className="flex items-center gap-1 bg-[#e4e6eb] px-2 py-0.5 rounded-md text-[13px]">
            <FaGlobeAmericas size={12} />
            <span>Public</span>
            <IoIosArrowDown size={14} />
          </button>
        </div>
      </div>

      {/* Textarea */}
      <div className="mb-3 bg-[#F8FAFC] p-2.5 rounded-2xl border">
        <textarea
          ref={captionInput}
          defaultValue={body}
          placeholder={`What's on your mind, ${user.name.split(" ")[0]}?`}
          className="w-full min-h-24 resize-none border-none text-[20px] outline-none bg-transparent"
        />
      </div>

      {/* Image preview */}
      {imagePreview && (
        <div className="relative mb-4">
          <button
            onClick={handleClearImage}
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
          >
            <IoMdClose size={20} />
          </button>
          <img
            src={imagePreview}
            className="w-full h-64 object-cover rounded-lg border"
          />
        </div>
      )}

      <hr className="mb-3" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <label
            htmlFor="photo"
            className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer"
          >
            <FaRegImage className="text-[#45bd62]" size={20} />
            <span className="text-[15px]">Photo/video</span>
          </label>
          <input
            type="file"
            id="photo"
            hidden
            ref={imageInput}
            onChange={handleChangeImage}
          />
          <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg">
            <FaRegSmile className="text-[#f7b928]" size={20} />
            <span className="text-[15px]">Feeling/activity</span>
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCancel}
            className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={updateMutation}
            disabled={isPending}
            className="bg-[#1b74e4] text-white px-8 py-2 rounded-lg font-bold flex items-center gap-2"
          >
            Update
            <IoSend size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}