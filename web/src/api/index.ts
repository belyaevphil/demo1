import { inst } from './axios'
import {
  User,
  InstructorCourseType,
  InstructorCoursesToManageType,
  InstructorLesson,
  GradeStudentLesson,
  CourseForStudentCoursePage,
  LessonForStudentLessonPage,
  LessonForInstructorGradeLessonPage,
  CourseForStudentCoursesPage
} from 'types'
import {
  CreateCourseDto,
  SignInDto,
  SignUpDto,
  GetCoursesDto,
  GetInstructorCoursesToManageDto,
  AssignCourseDto,
  AssignInstructorDto,
  AddAnswerDto,
  GradeLessonDto,
  GetInstructorLessonsToGradeDto,
  CreateLessonDto,
  EditLessonDto,
  DownloadLessonFileDto
} from './dto'

export type ResponseStatus = 'success' | 'error'
export type ResponseMessage = string | null

export type Response<ResponsePayload = null> = {
  status: ResponseStatus
  payload: ResponsePayload
  message: ResponseMessage
}

export const API = {
  auth: {
    getAuthData: async () => {
      const response = await inst.get<
        Response<{
          userData: User
        }>
      >('/auth/me')
      return response.data
    },
    signUp: async (signUpDto: SignUpDto) => {
      const response = await inst.post<Response>('/auth/sign/up', signUpDto)
      return response.data
    },
    signIn: async (signInDto: SignInDto) => {
      const response = await inst.post<
        Response<{
          userData: User
        }>
      >('/auth/sign/in', signInDto)
      return response.data
    },
    signOut: async () => {
      const response = await inst.post<Response>('/auth/sign/out')
      return response.data
    }
  },
  courses: {
    create: async (createCourseDto: CreateCourseDto) => {
      const response = await inst.post<Response>('/courses', createCourseDto)
      return response.data
    },
    get: async (getCoursesDTO?: GetCoursesDto) => {
      const response = await inst.get<
        Response<{
          courses: CourseForStudentCoursesPage[]
        }>
      >(`/courses?page=${getCoursesDTO?.pageNumber}&portionSize=${getCoursesDTO?.portionSize}`)
      return response.data
    },
    getInstructorCourse: async (id: number) => {
      const response = await inst.get<
        Response<{
          instructorCourse: InstructorCourseType
        }>
      >(`/courses/instructor/${id}`)
      return response.data
    },
    getInstructorCoursesToManage: async (
      getInstructorCoursesToManageDto?: GetInstructorCoursesToManageDto
    ) => {
      const response = await inst.get<
        Response<{
          courses: InstructorCoursesToManageType[]
        }>
      >(
        `/courses/instructor?page=${getInstructorCoursesToManageDto?.pageNumber}&portionSize=${getInstructorCoursesToManageDto?.portionSize}`
      )
      return response.data
    },
    getOneById: async (id: number) => {
      const response = await inst.get<
        Response<{
          courseData: CourseForStudentCoursePage
        }>
      >(`/courses/${id}`)
      return response.data
    },
    assign: async (assignCourseDto: AssignCourseDto) => {
      const response = await inst.post<Response>('/courses/assign', assignCourseDto)
      return response.data
    },
    assignInstructor: async (assignInstructorDto: AssignInstructorDto) => {
      const response = await inst.post<Response>('/courses/assign/instructor', assignInstructorDto)
      return response.data
    }
  },
  lessons: {
    create: async (createLessonDto: CreateLessonDto) => {
      const lessonData = new FormData()
      lessonData.append('courseId', createLessonDto.courseId)
      lessonData.append('name', createLessonDto.name)
      lessonData.append('description', createLessonDto.description)
      lessonData.append('files', createLessonDto.files)
      const response = await inst.post<Response>('/lessons', lessonData)
      return response.data
    },
    getOneById: async (id: number) => {
      const response = await inst.get<
        Response<{
          lessonData: LessonForStudentLessonPage
        }>
      >(`/lessons/${id}`)
      return response.data
    },
    downloadFile: async (downloadLessonFileDto: DownloadLessonFileDto) => {
      const response = await inst.get<BlobPart>(
        `/lessons/download/file?path=${downloadLessonFileDto.path}&name=${downloadLessonFileDto.name}`,
        {
          responseType: 'blob'
        }
      )
      return response.data
    },
    addAnswer: async (addAnswerDTO: AddAnswerDto) => {
      const response = await inst.post<Response>('/lessons/answer', addAnswerDTO)
      return response.data
    },
    grade: async (gradeLessonDto: GradeLessonDto) => {
      const response = await inst.post<Response>('/lessons/grade', gradeLessonDto)
      return response.data
    },
    getInstructorLesson: async (id: number) => {
      const response = await inst.get<
        Response<{
          lessonData: InstructorLesson
        }>
      >(`/lessons/instructor/${id}`)
      return response.data
    },
    edit: async (editLessonDto: EditLessonDto) => {
      const lessonData = new FormData()
      lessonData.append('name', editLessonDto.name)
      lessonData.append('description', editLessonDto.description)
      lessonData.append('files', editLessonDto.files)
      const response = await inst.patch<
        Response<{
          lessonData: InstructorLesson
        }>
      >(`/lessons/${editLessonDto.instructorLessonId}`)
      return response.data
    },
    getInstructorLessonsToGrade: async (
      getInstructorLessonsToGradeDto?: GetInstructorLessonsToGradeDto
    ) => {
      const response = await inst.get<
        Response<{
          lessons: GradeStudentLesson[]
        }>
      >(
        `/lessons/instructor/grade?page=${getInstructorLessonsToGradeDto?.pageNumber}&portionSize=${getInstructorLessonsToGradeDto?.portionSize}`
      )
      return response.data
    },
    getInstructorLessonToGrade: async (id: number) => {
      const response = await inst.get<
        Response<{
          lesson: LessonForInstructorGradeLessonPage
        }>
      >(`/lessons/instructor/grade/${id}`)
      return response.data
    }
  }
}
