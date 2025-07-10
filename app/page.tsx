"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Heart, BookOpen, Sparkles, Award, Crown, Lightbulb, Flower, Sun } from "lucide-react"
import Image from "next/image"
import { franc } from "franc"

// Different themes for different teachers with unique flowers
const cardThemes = [
  {
    id: "golden",
    name: "Golden Wisdom",
    colors: {
      gradient: "from-yellow-500 via-orange-500 to-red-500",
      bg: "from-yellow-50 via-orange-50 to-red-50",
      accent: "text-yellow-600",
      border: "border-yellow-500",
    },
    icon: Crown,
    flower: "🌻", // Sunflower
    petalColor: "text-yellow-400",
    message:
      "Your golden wisdom has illuminated countless minds and hearts. Like the sun that never fails to rise, your guidance continues to inspire and nurture growth in every student you touch.",
    quote: "गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः।",
    quoteTranslation: "The Guru is Brahma, Vishnu, and Mahesh (Shiva)",
    animation: "animate-spin-slow",
  },
  {
    id: "emerald",
    name: "Emerald Garden",
    colors: {
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      bg: "from-green-50 via-emerald-50 to-teal-50",
      accent: "text-emerald-600",
      border: "border-emerald-500",
    },
    icon: Flower,
    flower: "🌸", // Cherry blossom
    petalColor: "text-pink-400",
    message:
      "Like a gardener who nurtures each plant with care, you have helped me grow and bloom. Your patience and dedication have been the fertile soil for my dreams to take root.",
    quote: "अज्ञान तिमिरान्धस्य ज्ञानाञ्जन शलाकया।",
    quoteTranslation: "You opened my eyes blinded by ignorance with the light of knowledge",
    animation: "animate-pulse",
  },
  {
    id: "royal",
    name: "Royal Purple",
    colors: {
      gradient: "from-purple-500 via-violet-500 to-indigo-500",
      bg: "from-purple-50 via-violet-50 to-indigo-50",
      accent: "text-purple-600",
      border: "border-purple-500",
    },
    icon: Award,
    flower: "🌺", // Hibiscus
    petalColor: "text-purple-400",
    message:
      "Your noble spirit and unwavering commitment to education make you royalty in the truest sense. You wear the crown of knowledge and share it generously with all.",
    quote: "तमसो मा ज्योतिर्गमय।",
    quoteTranslation: "Lead me from darkness to light",
    animation: "animate-bounce-slow",
  },
  {
    id: "sunset",
    name: "Sunset Bliss",
    colors: {
      gradient: "from-pink-500 via-rose-500 to-orange-500",
      bg: "from-pink-50 via-rose-50 to-orange-50",
      accent: "text-rose-600",
      border: "border-rose-500",
    },
    icon: Sun,
    flower: "🌹", // Rose
    petalColor: "text-rose-400",
    message:
      "Like a beautiful sunset that paints the sky with hope, your teachings have colored my world with possibilities. Every lesson from you is a masterpiece of inspiration.",
    quote: "विद्या ददाति विनयं विनयाद्याति पात्रताम्।",
    quoteTranslation: "Knowledge gives humility, from humility comes worthiness",
    animation: "animate-float",
  },
  {
    id: "ocean",
    name: "Ocean Depths",
    colors: {
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      bg: "from-blue-50 via-cyan-50 to-teal-50",
      accent: "text-blue-600",
      border: "border-blue-500",
    },
    icon: Sparkles,
    flower: "🌼", // Daisy
    petalColor: "text-blue-400",
    message:
      "Your knowledge runs as deep as the ocean, and like gentle waves, your wisdom reaches every corner of my mind. Thank you for being my lighthouse in the sea of learning.",
    quote: "शिष्य वत्सल गुरु कृपा।",
    quoteTranslation: "The guru's grace flows like a parent's love for their child",
    animation: "animate-wave",
  },
  {
    id: "forest",
    name: "Forest Serenity",
    colors: {
      gradient: "from-green-600 via-lime-500 to-yellow-500",
      bg: "from-green-50 via-lime-50 to-yellow-50",
      accent: "text-green-600",
      border: "border-green-500",
    },
    icon: Lightbulb,
    flower: "🌷", // Tulip
    petalColor: "text-green-400",
    message:
      "In the forest of knowledge, you are the wise tree under whose shade I found clarity. Your teachings are the roots that ground me and the branches that help me reach for the sky.",
    quote: "गुरु गोविन्द दोऊ खड़े, काके लागूं पाय।",
    quoteTranslation: "When both Guru and God stand before me, whom should I bow to first?",
    animation: "animate-sway",
  },
]

// Flower component for blossom animation
const BlossomFlower = ({ theme, delay = 0 }: { theme: any; delay?: number }) => (
  <div
    className="absolute animate-blossom opacity-0"
    style={{
      animationDelay: `${delay}s`,
      animationFillMode: "forwards",
    }}
  >
    <div className="relative">
      <div className="text-4xl animate-flower-bloom">{theme.flower}</div>
      <div className="absolute inset-0 animate-flower-glow">
        <div className={`w-8 h-8 rounded-full ${theme.petalColor} opacity-20 blur-sm`}></div>
      </div>
    </div>
  </div>
)

export default function GuruPurnimaWebsite() {
  const [teacherName, setTeacherName] = useState("")
  const [showCard, setShowCard] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [nameError, setNameError] = useState("")

  // Generate unique theme based on teacher's name
  const getThemeForTeacher = (name: string) => {
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      const char = name.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    const index = Math.abs(hash) % cardThemes.length
    return cardThemes[index]
  }

  const detectGibberish = (text: string): boolean => {
    const cleanText = text.toLowerCase().trim()

    // Common keyboard patterns (more specific)
    const keyboardPatterns = [
      /^qwerty+$/i,
      /^asdf+$/i,
      /^zxcv+$/i,
      /^hjkl+$/i,
      /^123456+$/i,
      /^abcdef+$/i,
      /^qazwsx+$/i,
    ]

    // Repeated characters (4+ same characters to be less strict)
    const repeatedChars = /(.)\1{3,}/

    // Very obvious random patterns (more specific)
    const obviousGibberish = [
      /^[qwerty]{5,}$/i,
      /^[asdfgh]{5,}$/i,
      /^[zxcvbn]{5,}$/i,
      /^[a-z]\\1{4,}$/i, // Same character repeated 5+ times
    ]

    // Check for obvious keyboard patterns
    if (keyboardPatterns.some((pattern) => pattern.test(cleanText))) {
      return true
    }

    // Check for excessive repeated characters
    if (repeatedChars.test(cleanText)) {
      return true
    }

    // Check for obvious gibberish patterns
    if (obviousGibberish.some((pattern) => pattern.test(cleanText))) {
      return true
    }

    // Only use franc for longer texts and be more lenient
    if (cleanText.length > 8) {
      try {
        const detectedLang = franc(cleanText)
        // Only reject if it's clearly not a language AND matches other suspicious patterns
        if (detectedLang === "und" && /^[a-z]{8,}$/.test(cleanText) && !/[aeiou].*[aeiou]/.test(cleanText)) {
          return true
        }
      } catch (error) {
        // If franc fails, don't reject based on this alone
        console.warn("Language detection failed:", error)
      }
    }

    return false
  }

  const validateName = (name: string): boolean => {
    // Remove extra spaces and check if empty
    const trimmedName = name.trim()
    if (trimmedName.length < 2) {
      setNameError("Please enter a valid name (at least 2 characters)")
      return false
    }

    // Check if name contains only letters, spaces, dots, and common name characters
    const namePattern = /^[a-zA-Z\s.''-]+$/
    if (!namePattern.test(trimmedName)) {
      setNameError("Please enter a valid name using only letters")
      return false
    }

    // Check if name has at least one letter (not just spaces/punctuation)
    const hasLetter = /[a-zA-Z]/.test(trimmedName)
    if (!hasLetter) {
      setNameError("Please enter a valid name")
      return false
    }

    // Check for reasonable length (not too long)
    if (trimmedName.length > 50) {
      setNameError("Name is too long (maximum 50 characters)")
      return false
    }

    // Check for gibberish text (less aggressive now)
    if (detectGibberish(trimmedName)) {
      setNameError("Please enter a real name, not random characters")
      return false
    }

    // More lenient vowel check - only for very long names without vowels
    const hasVowels = /[aeiouAEIOU]/.test(trimmedName)
    if (!hasVowels && trimmedName.length > 6) {
      setNameError("Please enter a valid name")
      return false
    }

    // Much more lenient word structure check - only catch obvious non-names
    const isObviousNonName = /^[bcdfghjklmnpqrstvwxyz]{5,}$/i.test(trimmedName) && !hasVowels
    if (isObviousNonName) {
      setNameError("Please enter a meaningful name")
      return false
    }

    setNameError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedName = teacherName.trim()

    if (validateName(trimmedName)) {
      setTeacherName(trimmedName)
      setIsAnimating(true)
      setTimeout(() => {
        setShowCard(true)
      }, 500)
    }
  }

  const resetForm = () => {
    setShowCard(false)
    setIsAnimating(false)
    setTeacherName("")
  }

  if (showCard) {
    const theme = getThemeForTeacher(teacherName)
    const IconComponent = theme.icon

    return (
      <div
        className={`min-h-screen bg-gradient-to-br ${theme.colors.bg} flex items-center justify-center p-2 sm:p-4 overflow-hidden relative`}
      >
        {/* Floating flower petals */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-petal-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              <div className="text-lg sm:text-2xl opacity-60 animate-petal-sway">{theme.flower}</div>
            </div>
          ))}
        </div>

        {/* Unique floating elements for each theme */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute ${theme.animation}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <IconComponent className={`w-3 h-3 sm:w-4 sm:h-4 ${theme.colors.accent} opacity-30`} />
            </div>
          ))}
        </div>

        <Card className="w-full max-w-sm sm:max-w-xl lg:max-w-2xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-card-entrance relative">
          {/* Blossoming flowers around the card - hidden on very small screens */}
          <div className="hidden sm:block absolute -top-4 -left-4 pointer-events-none">
            <BlossomFlower theme={theme} delay={1} />
          </div>
          <div className="hidden sm:block absolute -top-4 -right-4 pointer-events-none">
            <BlossomFlower theme={theme} delay={1.5} />
          </div>
          <div className="hidden sm:block absolute -bottom-4 -left-4 pointer-events-none">
            <BlossomFlower theme={theme} delay={2} />
          </div>
          <div className="hidden sm:block absolute -bottom-4 -right-4 pointer-events-none">
            <BlossomFlower theme={theme} delay={2.5} />
          </div>

          <CardContent className="p-0">
            {/* Dynamic Header Section */}
            <div
              className={`bg-gradient-to-r ${theme.colors.gradient} p-4 sm:p-6 lg:p-8 text-center text-white relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className={`${theme.animation} mb-3 sm:mb-4`}>
                  <IconComponent className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 text-yellow-200" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 animate-text-glow">
                  Happy Guru Purnima
                </h1>
                <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-2">{theme.name}</p>
                <div className="w-16 sm:w-20 lg:w-24 h-1 bg-yellow-300 mx-auto rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Dynamic Content */}
            <div className="p-4 sm:p-6 lg:p-8 text-center space-y-4 sm:space-y-6">
              <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-800 mb-3 sm:mb-4 px-2">
                  Dear <span className={`${theme.colors.accent} font-bold animate-text-shimmer`}>{teacherName}</span>{" "}
                  Sir/Madam
                </h2>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: "1s" }}>
                <div
                  className={`bg-gradient-to-r ${theme.colors.bg} p-4 sm:p-6 rounded-xl border-l-4 ${theme.colors.border}`}
                >
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 leading-relaxed">
                    {theme.message}
                  </p>
                </div>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: "1.5s" }}>
                <div className="flex items-center justify-center space-x-2 text-sm sm:text-base lg:text-lg text-gray-600 mb-2 px-2">
                  <span className="font-sanskrit text-center">{theme.quote}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 italic px-2">"{theme.quoteTranslation}"</p>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: "2s" }}>
                <div
                  className={`bg-white p-4 sm:p-6 rounded-xl shadow-inner border-2 ${theme.colors.border.replace("border-", "border-").replace("-500", "-200")}`}
                >
                  <Heart className={`w-6 h-6 sm:w-8 sm:h-8 ${theme.colors.accent} mx-auto mb-3 animate-pulse`} />
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-800 mb-2">
                    On this sacred day of Guru Purnima, I bow down to your wisdom and dedication.
                  </p>
                  <p className={`text-base sm:text-lg lg:text-xl font-bold ${theme.colors.accent} mt-3`}>
                    With deepest gratitude and respect,
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mt-2 animate-text-glow">
                    Your devoted student, Ansh Soni
                  </p>
                </div>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: "2.5s" }}>
                <Button
                  onClick={resetForm}
                  className={`bg-gradient-to-r ${theme.colors.gradient} hover:opacity-90 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-h-[44px]`}
                >
                  Create Another Card
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/guru-background.jpg" alt="Educational background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/70 via-red-900/60 to-yellow-900/70"></div>
      </div>

      {/* Subtle flower petals on landing page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-petal-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${12 + Math.random() * 6}s`,
            }}
          >
            <div className="text-lg sm:text-xl opacity-30 animate-petal-sway">🌸</div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4">
        <div
          className={`w-full max-w-sm sm:max-w-md transition-all duration-500 ${isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 mx-2 sm:mx-0">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <div className="animate-bounce-slow mb-4 sm:mb-6">
                  <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-orange-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Guru Purnima</h1>
                <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4 px-2">A Special Tribute to My Gurus</p>
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="teacherName" className="block text-sm font-medium text-gray-700 mb-2 px-1">
                    Dear Teacher, please enter your name:
                  </label>
                  <Input
                    id="teacherName"
                    type="text"
                    value={teacherName}
                    onChange={(e) => {
                      setTeacherName(e.target.value)
                      if (nameError) setNameError("")
                    }}
                    placeholder="Enter your name here..."
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg border-2 rounded-lg focus:ring-orange-500 transition-colors ${
                      nameError ? "border-red-300 focus:border-red-500" : "border-orange-200 focus:border-orange-500"
                    }`}
                    required
                  />
                  {nameError && (
                    <p className="text-red-500 text-sm mt-2 flex items-center px-1">
                      <span className="mr-1">⚠️</span>
                      {nameError}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-2.5 sm:py-3 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-h-[44px]"
                  disabled={!teacherName.trim() || !!nameError}
                >
                  Receive Your Special Message
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </form>

              <div className="mt-6 sm:mt-8 text-center">
                <p className="text-xs sm:text-sm text-gray-500">Created with ❤️ by Ansh Soni</p>
                <p className="text-xs text-gray-400 mt-1 px-2">In honor of all the wonderful teachers who guide us</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
