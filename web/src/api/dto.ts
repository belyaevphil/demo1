export type SignUpDto = {
  username: string
  password: string
  repeatPassword: string
  firstName: string
  lastName: string
}

export type SignInDto = {
  username: string
  password: string
}

export type AssignInstructorDto = {
  username: string
  courseName: string
}

export type AssignCourseDto = {
  username: string
  courseName: string
}

export type CreateCourseDto = {
  courseName: string
}

export type GetCoursesDto = {
  pageNumber: number
  portionSize: number
}

export type GetInstructorCoursesToManageDto = GetCoursesDto

export type AddAnswerDto = {
  answer: string
}

export type GradeLessonDto = {
  id: number
  grade: number
}

export type GetInstructorLessonsToGradeDto = GetCoursesDto

export type CreateLessonDto = {
  courseId: string
  name: string
  description: string
  files: string
}

export type EditLessonDto = {
  instructorLessonId: string
  name: string
  description: string
  files: string
}

export type DownloadLessonFileDto = {
  path: string
  name: string
}
