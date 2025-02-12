import { useState } from "react";
import "./MailWindow.css";
import { BsSend } from "react-icons/bs";
import emailjs from "@emailjs/browser";

function MailWindow({ closeMail }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = () => {
    if (!subject || !message) {
      alert("Please fill in both fields before sending.");
      return;
    }

    const templateParams = {
      subject,
      message,
      to_email: "madhu.shrestha666@gmail.com",
    };

    emailjs
      .send(
        "service_j9mxoqu",
        "template_mkl7zs8",
        templateParams,
        "cM2rKVsLcVF654esh"
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          alert("Email sent successfully!");
          setSubject("");
          setMessage("");
        },
        (error) => {
          console.error("Email failed to send:", error);
          alert("Failed to send email. Try again.");
        }
      );
  };

  const [position, setPosition] = useState({ x: 50, y: 75 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);

    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) {
      return;
    }

    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="mail-background"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="top-bar bg-zinc-700" onMouseDown={handleMouseDown}>
        <div className="side-top-part py-4 px-4 flex gap-x-2">
          {/* Close button */}
          <button
            className="w-3 h-3 rounded-full bg-red-400 cursor-pointer"
            onClick={closeMail}
          ></button>
          <button className="w-3 h-3 rounded-full bg-yellow-400 cursor-auto"></button>
          <button className="w-3 h-3 rounded-full bg-green-400 cursor-auto"></button>
        </div>
        <div className="ml-auto mr-4 cursor-pointer" onClick={sendEmail}>
          <BsSend />
        </div>
      </div>

      <div className="mail">
        <div className="pt-2 text-[#8e8e93] text-[14px]">To: Madhu</div>
        <hr></hr>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full pb-2 text-[14px] text-[#8e8e93] border-b"
        />
        <textarea
          placeholder="Write your feedback here and click the send button :D"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full mt-2 text-[#8e8e93] h-80"
        ></textarea>
      </div>
    </div>
  );
}

export default MailWindow;
