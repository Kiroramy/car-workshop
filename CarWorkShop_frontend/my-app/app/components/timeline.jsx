import { motion } from "framer-motion";
import { useState } from "react";

const Timeline = ({ status }) => {
  // بيانات المراحل مع الحالة (status)
  const stages = [
    { id: 1, title: "PENDING", status: "pending", icon: "⏳" },
    { id: 2, title: "CHECKING...", status: "checking", icon: "🔍" },
    { id: 3, title: "UNDERREPAIR", status: "underrepair", icon: "🛠️" },
    { id: 4, title: "FINISHED", status: "finished", icon: "✅" },
  ];

  // الحالة الحالية (يمكن تغييرها بناءً على البيانات الفعلية)

  // ترتيب الحالة الحالية في المصفوفة
  const currentStageIndex = stages.findIndex(
    (stage) => stage.status === status
  );

  // حساب عرض الخط بناءً على ترتيب الحالة الحالية
  const lineWidth = ((currentStageIndex + 1) / stages.length) * 100;

  return (
    <div
      className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4"
      style={{ height: "26%", marginTop: "30px" }}
    >
      <div className="relative w-full max-w-4xl mx-auto">
        {/* الخط الملون الذي يربط بين المراحل */}
        <div className="absolute left-16 right-16 top-1/2 h-1 bg-gray-300 transform -translate-y-1/2 z-0">
          <motion.div
            className="h-full bg-green-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{ originX: 0, width: `${lineWidth}%` }} // عرض الخط يتوقف عند الحالة الحالية
          />
        </div>

        {/* المراحل مرتبة أفقيًا */}
        <div className="relative flex justify-between z-10">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 }}
              className="flex flex-col items-center space-y-2"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  index <= currentStageIndex
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {stage.icon}
              </div>
              <span
                className={`font-roboto text-lg ${
                  index <= currentStageIndex
                    ? "text-green-500"
                    : "text-gray-700"
                }`}
              >
                {stage.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
