export interface LessonStep {
  id: string;
  type: 'text' | 'image' | 'video' | 'interactive' | 'quiz';
  content: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface Lesson {
  id: string;
  pathId: string;
  title: string;
  description: string;
  steps: LessonStep[];
  estimatedMinutes: number;
  orderIndex: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score?: number;
  completedAt?: string;
}

// Smartphone Basics Lessons
export const smartphoneBasicsLessons: Lesson[] = [
  {
    id: "smartphone-1",
    pathId: "smartphone-basics",
    title: "Getting to Know Your Phone",
    description: "Learn the basic parts and functions of your smartphone",
    estimatedMinutes: 10,
    orderIndex: 1,
    steps: [
      {
        id: "step-1",
        type: "text",
        content: "Welcome to your smartphone! Let's start by learning the basic parts of your phone."
      },
      {
        id: "step-2",
        type: "text",
        content: "Your smartphone has several important parts: the screen (where you see everything), the power button (usually on the side), and the home button (at the bottom)."
      },
      {
        id: "step-3",
        type: "interactive",
        content: "Let's practice! Try pressing the power button on your phone. What happens?",
        options: ["The screen turns on", "The screen turns off", "Nothing happens", "The phone makes a sound"],
        correctAnswer: "The screen turns on",
        explanation: "Great! The power button turns your phone on and off. When you press it, the screen should light up."
      },
      {
        id: "step-4",
        type: "text",
        content: "The home button (or home area) takes you back to your main screen. Try pressing it now!"
      },
      {
        id: "step-5",
        type: "quiz",
        content: "What does the power button do?",
        options: ["Makes calls", "Turns the phone on/off", "Takes photos", "Plays music"],
        correctAnswer: "Turns the phone on/off",
        explanation: "The power button controls whether your phone is on or off."
      }
    ]
  },
  {
    id: "smartphone-2",
    pathId: "smartphone-basics",
    title: "Making Your First Call",
    description: "Learn how to make and receive phone calls",
    estimatedMinutes: 15,
    orderIndex: 2,
    steps: [
      {
        id: "step-1",
        type: "text",
        content: "Now let's learn how to make a phone call! This is one of the most important things your phone can do."
      },
      {
        id: "step-2",
        type: "text",
        content: "To make a call, look for the green phone icon on your home screen. It looks like an old telephone."
      },
      {
        id: "step-3",
        type: "interactive",
        content: "Find the phone app on your screen. What color is the phone icon usually?",
        options: ["Red", "Green", "Blue", "Yellow"],
        correctAnswer: "Green",
        explanation: "The phone app is usually green and looks like an old telephone handset."
      },
      {
        id: "step-4",
        type: "text",
        content: "Tap the phone icon to open it. You'll see a number pad where you can type phone numbers."
      },
      {
        id: "step-5",
        type: "text",
        content: "To call someone, type their phone number using the number pad, then tap the green call button."
      },
      {
        id: "step-6",
        type: "quiz",
        content: "What color is the call button when you want to make a phone call?",
        options: ["Red", "Green", "Blue", "Yellow"],
        correctAnswer: "Green",
        explanation: "The green call button starts the phone call."
      }
    ]
  },
  {
    id: "smartphone-3",
    pathId: "smartphone-basics",
    title: "Sending Text Messages",
    description: "Learn how to send and read text messages",
    estimatedMinutes: 12,
    orderIndex: 3,
    steps: [
      {
        id: "step-1",
        type: "text",
        content: "Text messages (or SMS) let you send short written messages to friends and family."
      },
      {
        id: "step-2",
        type: "text",
        content: "Look for the Messages app on your phone. It usually has a blue or green chat bubble icon."
      },
      {
        id: "step-3",
        type: "interactive",
        content: "What does the Messages app icon look like?",
        options: ["A green phone", "A chat bubble", "A camera", "A calendar"],
        correctAnswer: "A chat bubble",
        explanation: "The Messages app has a chat bubble icon, usually in blue or green."
      },
      {
        id: "step-4",
        type: "text",
        content: "To send a message, tap the Messages app, then tap the + or 'New Message' button."
      },
      {
        id: "step-5",
        type: "text",
        content: "Type the person's name or phone number, then type your message in the text box at the bottom."
      },
      {
        id: "step-6",
        type: "quiz",
        content: "Where do you type your message when sending a text?",
        options: ["At the top of the screen", "In the middle", "At the bottom", "On the side"],
        correctAnswer: "At the bottom",
        explanation: "The text input box is usually at the bottom of the screen."
      }
    ]
  }
];

// Online Security Lessons
export const onlineSecurityLessons: Lesson[] = [
  {
    id: "security-1",
    pathId: "online-security",
    title: "Understanding Online Threats",
    description: "Learn about common online scams and how to spot them",
    estimatedMinutes: 15,
    orderIndex: 1,
    steps: [
      {
        id: "step-1",
        type: "text",
        content: "The internet is a great place, but there are some people who try to trick others. Let's learn how to stay safe!"
      },
      {
        id: "step-2",
        type: "text",
        content: "A scam is when someone tries to trick you into giving them money or personal information."
      },
      {
        id: "step-3",
        type: "interactive",
        content: "Which of these is a common scam?",
        options: ["Someone asking for your password", "A friend saying hello", "A weather report", "A news article"],
        correctAnswer: "Someone asking for your password",
        explanation: "Never give your password to anyone, even if they say they're from a company you trust."
      },
      {
        id: "step-4",
        type: "text",
        content: "If someone asks for your password, bank details, or personal information, it's probably a scam."
      },
      {
        id: "step-5",
        type: "quiz",
        content: "What should you do if someone asks for your password?",
        options: ["Give it to them", "Ignore them", "Ask a friend", "Call the police"],
        correctAnswer: "Ignore them",
        explanation: "Never give your password to anyone. Just ignore the request."
      }
    ]
  },
  {
    id: "security-2",
    pathId: "online-security",
    title: "Creating Strong Passwords",
    description: "Learn how to create secure passwords to protect your accounts",
    estimatedMinutes: 10,
    orderIndex: 2,
    steps: [
      {
        id: "step-1",
        type: "text",
        content: "A strong password helps keep your accounts safe from hackers."
      },
      {
        id: "step-2",
        type: "text",
        content: "A good password should be at least 8 characters long and include letters, numbers, and symbols."
      },
      {
        id: "step-3",
        type: "interactive",
        content: "Which password is stronger?",
        options: ["password123", "MyDogSpot!", "123456", "abc123"],
        correctAnswer: "MyDogSpot!",
        explanation: "MyDogSpot! is stronger because it has uppercase, lowercase, numbers, and a symbol."
      },
      {
        id: "step-4",
        type: "text",
        content: "Never use easy passwords like 'password' or '123456'. These are very easy for hackers to guess."
      },
      {
        id: "step-5",
        type: "quiz",
        content: "How long should a strong password be?",
        options: ["4 characters", "6 characters", "8 characters", "12 characters"],
        correctAnswer: "8 characters",
        explanation: "A strong password should be at least 8 characters long."
      }
    ]
  }
];

// Email Essentials Lessons
export const emailEssentialsLessons: Lesson[] = [
  {
    id: "email-1",
    pathId: "email-essentials",
    title: "Understanding Email",
    description: "Learn what email is and how it works",
    estimatedMinutes: 8,
    orderIndex: 1,
    steps: [
      {
        id: "step-1",
        type: "text",
        content: "Email is like sending a digital letter. It's a way to send messages to people anywhere in the world."
      },
      {
        id: "step-2",
        type: "text",
        content: "Every email address has an @ symbol in it, like 'john@gmail.com' or 'mary@yahoo.com'."
      },
      {
        id: "step-3",
        type: "interactive",
        content: "Which of these is a valid email address?",
        options: ["john.gmail.com", "john@gmail.com", "john gmail", "john@.com"],
        correctAnswer: "john@gmail.com",
        explanation: "A valid email address must have an @ symbol and a domain like .com, .org, etc."
      },
      {
        id: "step-4",
        type: "quiz",
        content: "What symbol must every email address contain?",
        options: ["#", "@", "$", "%"],
        correctAnswer: "@",
        explanation: "Every email address must contain the @ symbol."
      }
    ]
  },
  {
    id: "email-2",
    pathId: "email-essentials",
    title: "Sending Your First Email",
    description: "Learn how to compose and send an email",
    estimatedMinutes: 12,
    orderIndex: 2,
    steps: [
      {
        id: "step-1",
        type: "text",
        content: "To send an email, you need to open your email app (like Gmail, Outlook, or Mail)."
      },
      {
        id: "step-2",
        type: "text",
        content: "Look for a button that says 'Compose', 'New', or '+'. This starts a new email."
      },
      {
        id: "step-3",
        type: "interactive",
        content: "What button do you click to start writing a new email?",
        options: ["Delete", "Compose", "Reply", "Forward"],
        correctAnswer: "Compose",
        explanation: "The 'Compose' button starts a new email message."
      },
      {
        id: "step-4",
        type: "text",
        content: "In the 'To' field, type the email address of the person you want to send the email to."
      },
      {
        id: "step-5",
        type: "text",
        content: "In the 'Subject' field, write a short description of what your email is about."
      },
      {
        id: "step-6",
        type: "quiz",
        content: "Where do you type the email address of the person you're sending to?",
        options: ["Subject field", "To field", "Body", "From field"],
        correctAnswer: "To field",
        explanation: "The 'To' field is where you put the recipient's email address."
      }
    ]
  }
];

// Social Media Safety Lessons
export const socialMediaSafetyLessons: Lesson[] = [
  {
    id: "social-1",
    pathId: "social-media-safety",
    title: "What is Social Media?",
    description: "Learn about social media platforms and their basic features",
    estimatedMinutes: 10,
    orderIndex: 1,
    steps: [
      {
        id: "step-1",
        type: "text",
        content: "Social media lets you connect with friends and family online. Popular platforms include Facebook, Instagram, and WhatsApp."
      },
      {
        id: "step-2",
        type: "text",
        content: "On social media, you can share photos, send messages, and see what your friends are doing."
      },
      {
        id: "step-3",
        type: "interactive",
        content: "Which of these is a social media platform?",
        options: ["Google Maps", "Facebook", "Calculator", "Weather App"],
        correctAnswer: "Facebook",
        explanation: "Facebook is a social media platform where you can connect with friends and family."
      },
      {
        id: "step-4",
        type: "quiz",
        content: "What can you do on social media?",
        options: ["Only make phone calls", "Only send emails", "Share photos and messages", "Only check the weather"],
        correctAnswer: "Share photos and messages",
        explanation: "Social media lets you share photos, send messages, and connect with others."
      }
    ]
  }
];

// Video Calling Lessons
export const videoCallingLessons: Lesson[] = [
  {
    id: "video-1",
    pathId: "video-calling",
    title: "Understanding Video Calls",
    description: "Learn what video calling is and how it works",
    estimatedMinutes: 8,
    orderIndex: 1,
    steps: [
      {
        id: "step-1",
        type: "text",
        content: "Video calling lets you see and talk to people face-to-face, even when they're far away."
      },
      {
        id: "step-2",
        type: "text",
        content: "Popular video calling apps include Zoom, FaceTime (on iPhone), and WhatsApp."
      },
      {
        id: "step-3",
        type: "interactive",
        content: "What can you do during a video call?",
        options: ["Only hear the person", "See and hear the person", "Only send text messages", "Only send emails"],
        correctAnswer: "See and hear the person",
        explanation: "Video calls let you both see and hear the other person in real-time."
      },
      {
        id: "step-4",
        type: "quiz",
        content: "Which app is commonly used for video calls?",
        options: ["Calculator", "Zoom", "Maps", "Weather"],
        correctAnswer: "Zoom",
        explanation: "Zoom is a popular app for video calling and meetings."
      }
    ]
  }
];

// Online Shopping Lessons
export const onlineShoppingLessons: Lesson[] = [
  {
    id: "shopping-1",
    pathId: "online-shopping",
    title: "Safe Online Shopping",
    description: "Learn how to shop safely online and avoid scams",
    estimatedMinutes: 15,
    orderIndex: 1,
    steps: [
      {
        id: "step-1",
        type: "text",
        content: "Online shopping lets you buy things from home using your computer or phone."
      },
      {
        id: "step-2",
        type: "text",
        content: "Popular shopping websites include Amazon, eBay, and Walmart.com."
      },
      {
        id: "step-3",
        type: "interactive",
        content: "What should you look for to know a shopping website is safe?",
        options: ["A lock symbol in the address bar", "Lots of colors", "Big letters", "Pictures of products"],
        correctAnswer: "A lock symbol in the address bar",
        explanation: "A lock symbol means the website is secure and safe to enter your payment information."
      },
      {
        id: "step-4",
        type: "text",
        content: "Never enter your credit card information on websites that don't have a lock symbol or 'https' in the address."
      },
      {
        id: "step-5",
        type: "quiz",
        content: "What does 'https' in a website address mean?",
        options: ["The website is free", "The website is secure", "The website is fast", "The website is old"],
        correctAnswer: "The website is secure",
        explanation: "HTTPS means the website is secure and safe for entering personal information."
      }
    ]
  }
];

// All lessons organized by path
export const allLessons: Lesson[] = [
  ...smartphoneBasicsLessons,
  ...onlineSecurityLessons,
  ...emailEssentialsLessons,
  ...socialMediaSafetyLessons,
  ...videoCallingLessons,
  ...onlineShoppingLessons
];

// Helper functions
export const getLessonsForPath = (pathId: string): Lesson[] => {
  return allLessons.filter(lesson => lesson.pathId === pathId).sort((a, b) => a.orderIndex - b.orderIndex);
};

export const getLessonById = (lessonId: string): Lesson | undefined => {
  return allLessons.find(lesson => lesson.id === lessonId);
};

export const getNextLesson = (currentLessonId: string): Lesson | undefined => {
  const currentLesson = getLessonById(currentLessonId);
  if (!currentLesson) return undefined;
  
  const pathLessons = getLessonsForPath(currentLesson.pathId);
  const currentIndex = pathLessons.findIndex(lesson => lesson.id === currentLessonId);
  
  return pathLessons[currentIndex + 1];
};

export const getPreviousLesson = (currentLessonId: string): Lesson | undefined => {
  const currentLesson = getLessonById(currentLessonId);
  if (!currentLesson) return undefined;
  
  const pathLessons = getLessonsForPath(currentLesson.pathId);
  const currentIndex = pathLessons.findIndex(lesson => lesson.id === currentLessonId);
  
  return pathLessons[currentIndex - 1];
}; 