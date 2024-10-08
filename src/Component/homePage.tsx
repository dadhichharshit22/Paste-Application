import { Copy } from "lucide-react";
import { useEffect, useState, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../Redux/pasteSlice";
import { useSearchParams } from "react-router-dom";


interface Paste {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}


interface RootState {
  paste: {
    pastes: Paste[];
  };
}

const Home: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId: string | null = searchParams.get("pasteId");
  const pastes: Paste[] = useSelector((state: RootState) => state.paste.pastes);
  const dispatch = useDispatch();

  
  const createPaste = () => {
    const paste: Paste = {
      title: title.trim(),
      content: value.trim(),
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
    
      dispatch(updatePastes(paste));
      toast.success("Paste updated successfully!");
    } else {
      dispatch(addToPastes(paste));
      toast.success("Paste created successfully!");
    }

    setTitle("");
    setValue("");

    
    setSearchParams({});
  };


  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
    toast.success("Paste reset.");
  };


  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      } else {
        toast.error("Paste not found.");
        setSearchParams({});
      }
    }
  }, [pasteId, pastes, setSearchParams]);

  
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            
            className={`${
              pasteId ? "w-[80%]" : "w-[85%]"
            } text-black border border-input rounded-md p-2`}
          />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={createPaste}
            disabled={!title.trim() || !value.trim()} 
          >
            {pasteId ? "Update Paste" : "Create My Paste"}
          </button>

          {pasteId && (
            <button
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700"
              onClick={resetPaste}
            >
              Reset
            </button>
          )}
        </div>

        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

              <div
                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
              />

              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>
            
            <div
              className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
            >
        
              <button
                className={`flex justify-center items-center transition-all duration-300 ease-in-out group`}
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
                disabled={!value.trim()} 
              >
                <Copy
                  className="group-hover:text-success-500"
                  size={20}
                />
              </button>
            </div>
          </div>

          
          <textarea
            value={value}
            onChange={handleContentChange}
            placeholder="Write Your Content Here...."
            className="w-full p-3 focus-visible:ring-0"
            style={{
              caretColor: "#000",
            }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
