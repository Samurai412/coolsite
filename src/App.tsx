import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.css";
import AvatarGenerator from "react-avatar-generator";
import React from "react";

class CustomAvatarGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.avatarGenerator = null;
  }

  randomize() {
    this.avatarGenerator.randomize();
  }

  render() {
    return (
      <div className="avatar-generator">
        <button onClick={() => this.randomize()}>Randomize</button>
        <AvatarGenerator
          ref={(el) => {
            this.avatarGenerator = el;
          }}
          colors={["#333", "#222", "#ccc"]}
          backgroundColor="#000"
        />
      </div>
    );
  }
}

const LearningWebsite = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React Fundamentals",
      description: "Learn the basics of React",
    },
    {
      id: 2,
      title: "Advanced React",
      description: "Take your React skills to the next level",
    },
    { id: 3, title: "React Hooks", description: "Master React Hooks" },
  ]);

  const [lessons, setLessons] = useState([
    {
      id: 1,
      courseId: 1,
      title: "Introduction to React",
      content: "Welcome to React!",
    },
    {
      id: 2,
      courseId: 1,
      title: "React Components",
      content: "Components are the building blocks of React",
    },
    {
      id: 3,
      courseId: 1,
      title: "React State and Props",
      content: "State and props are essential for dynamic components",
    },
    {
      id: 4,
      courseId: 3,
      title: "React Hooks",
      content: "Hooks are a new way to use state and other React features",
    },
    {
      id: 5,
      courseId: 2,
      title: "Advanced Components",
      content: "Advanced techniques for component reusability",
    },
    {
      id: 6,
      courseId: 2,
      title: "React Context",
      content: "Context is a way to share data between components",
    },
    {
      id: 7,
      courseId: 3,
      title: "Advanced React Hooks",
      content: "Master advanced patterns with hooks",
    },
  ]);

  const [activeCourse, setActiveCourse] = useState(courses[0]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonContent, setNewLessonContent] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");

  // Fixing the bookmark toggle for courses and lessons
  const toggleBookmark = (item, isCourse) => {
    const isBookmarked = bookmarks.find(
      (bookmark) => bookmark.id === item.id && bookmark.isCourse === isCourse
    );

    if (isBookmarked) {
      setBookmarks(
        bookmarks.filter(
          (bookmark) =>
            bookmark.id !== item.id || bookmark.isCourse !== isCourse
        )
      );
    } else {
      setBookmarks([...bookmarks, { ...item, isCourse }]);
    }
  };

  const isBookmarked = (item, isCourse) =>
    bookmarks.some(
      (bookmark) => bookmark.id === item.id && bookmark.isCourse === isCourse
    );

  // Handling course addition
  const handleAddCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      title: newCourseTitle,
      description: newCourseDescription,
    };
    setCourses([...courses, newCourse]);
    setNewCourseTitle("");
    setNewCourseDescription("");
  };

  // Handling lesson addition
  const handleAddLesson = () => {
    const newLesson = {
      id: lessons.length + 1,
      courseId: activeCourse.id,
      title: newLessonTitle,
      content: newLessonContent,
    };
    setLessons([...lessons, newLesson]);
    setActiveLesson(newLesson);
    setNewLessonTitle("");
    setNewLessonContent("");
  };

  const courseLessons = lessons.filter(
    (lesson) => lesson.courseId === activeCourse.id
  );

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen p-4 md:p-6 lg:p-8`}
    >
      <header
        className={`${
          darkMode ? "bg-gray-800" : "bg-blue-500"
        } text-white p-4 rounded-lg mb-6 flex justify-between items-center`}
      >
        <h1 className="text-3xl font-bold">Learning Website</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg ${
            darkMode ? "bg-gray-700 text-yellow-400" : "bg-gray-200 text-black"
          }`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <main className="flex flex-col md:flex-row gap-6">
        <aside
          className={`${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          } w-full md:w-1/3 lg:w-1/4 xl:w-1/5 p-6 rounded-lg`}
        >
          <h2 className="text-2xl font-bold mb-4">Courses</h2>
          <ul>
            {courses.map((course) => (
              <li
                key={course.id}
                className="mb-2 flex justify-between items-center"
              >
                <button
                  className={`w-full text-left p-3 rounded-lg ${
                    activeCourse.id === course.id
                      ? `${
                          darkMode
                            ? "bg-gray-700 text-white"
                            : "bg-blue-500 text-white"
                        }`
                      : `${
                          darkMode
                            ? "bg-gray-600 text-white"
                            : "bg-gray-200 text-black"
                        } hover:${darkMode ? "bg-gray-700" : "bg-gray-300"}`
                  }`}
                  onClick={() => setActiveCourse(course)}
                >
                  {course.title}
                </button>
                <span
                  className="ml-2 cursor-pointer text-2xl"
                  onClick={() => toggleBookmark(course, true)}
                >
                  {isBookmarked(course, true) ? "★" : "☆"}
                </span>
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-bold mb-2 mt-4">Add New Course</h3>
          <input
            type="text"
            value={newCourseTitle}
            onChange={(e) => setNewCourseTitle(e.target.value)}
            placeholder="Course Title"
            className="w-full p-2 rounded-lg mb-2"
          />
          <textarea
            value={newCourseDescription}
            onChange={(e) => setNewCourseDescription(e.target.value)}
            placeholder="Course Description"
            className="w-full p-2 rounded-lg mb-4"
          />
          <button
            className={`${
              darkMode ? "bg-gray-600" : "bg-blue-500"
            } text-white p-2 rounded-lg`}
            onClick={handleAddCourse}
          >
            Add Course
          </button>
          <CustomAvatarGenerator />
        </aside>
        <section
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } w-full md:w-2/3 lg:w-3/4 xl:w-4/5 p-6 rounded-lg`}
        >
          <h2 className="text-2xl font-bold mb-4">{activeCourse.title}</h2>
          <p className="text-lg mb-4">{activeCourse.description}</p>
          <div className="flex flex-col gap-6">
            <div
              className={`${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              } p-6 rounded-lg`}
            >
              <h3 className="text-xl font-bold mb-2">Lessons</h3>
              <ul>
                {courseLessons.map((lesson) => (
                  <li
                    key={lesson.id}
                    className="mb-2 flex justify-between items-center"
                  >
                    <button
                      className={`w-full text-left p-3 rounded-lg ${
                        activeLesson && activeLesson.id === lesson.id
                          ? `${
                              darkMode
                                ? "bg-gray-700 text-white"
                                : "bg-blue-500 text-white"
                            }`
                          : `${
                              darkMode
                                ? "bg-gray-600 text-white"
                                : "bg-gray-200 text-black"
                            } hover:${darkMode ? "bg-gray-700" : "bg-gray-300"}`
                      }`}
                      onClick={() => setActiveLesson(lesson)}
                    >
                      {lesson.title}
                    </button>
                    <span
                      className="ml-2 cursor-pointer text-2xl"
                      onClick={() => toggleBookmark(lesson, false)}
                    >
                      {isBookmarked(lesson, false) ? "★" : "☆"}
                    </span>
                  </li>
                ))}
              </ul>
              <h3 className="text-xl font-bold mb-2 mt-4">Add New Lesson</h3>
              <input
                type="text"
                value={newLessonTitle}
                onChange={(e) => setNewLessonTitle(e.target.value)}
                placeholder="Lesson Title"
                className="w-full p-2 rounded-lg mb-2"
              />
              <textarea
                value={newLessonContent}
                onChange={(e) => setNewLessonContent(e.target.value)}
                placeholder="Lesson Content"
                className="w-full p-2 rounded-lg mb-4"
              />
              <button
                className={`${
                  darkMode ? "bg-gray-600" : "bg-blue-500"
                } text-white p-2 rounded-lg`}
                onClick={handleAddLesson}
              >
                Add Lesson
              </button>
            </div>
            {activeLesson && (
              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                } p-6 rounded-lg`}
              >
                <h3 className="text-xl font-bold mb-4">{activeLesson.title}</h3>
                <ReactMarkdown
                  className="markdown"
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex, rehypePrism]}
                >
                  {activeLesson.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LearningWebsite;
