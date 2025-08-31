import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment';
import Footer from '../components/Footer'

const Applications = () => {

  const [isEdit, setIsEdit ] =useState(false)
  const [resume, setResume] = useState(null)

  return (
    <>
       <Navbar/>
       <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
          <h2 className='text-xl font-semibold'>Your Resume</h2>
          <div className='flex gap-2 mb-6 mt-3'>
              {
                isEdit
                ? <>
                      <label className='flex items-center' htmlFor="resumeUpload">
                        <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>Select Resume</p>
                        <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file"  hidden/>
                        <img src={assets.profile_upload_icon} alt="" />
                      </label>
                      <button onClick={e => setIsEdit(false)} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'>Save</button>
                  </>
                : <div className='flex gap-2 '>
                      <a className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' href="">Resume</a>
                      <button onClick={()=> setIsEdit(true)} className=' text-gray-500 border border-gray-300 rounded-lg px-4 py-2 '>Edit</button>
                </div>
              }
          </div>

          <h2 className='text-xl font-semibold mb-4'>Job Applied </h2>
          <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
            <thead>
              <tr>
                <th className='py-3 px-4 border-b border-gray-200 text-left '>Company</th>
                <th className='py-3 px-4 border-b border-gray-200 text-left '>Job Title</th>
                <th className='py-3 px-4 border-b border-gray-200 text-left max-sm:hidden'>Location</th>
                <th className='py-3 px-4 border-b border-gray-200 text-left max-sm:hidden'>Date</th>
                <th className='py-3 px-4 border-b border-gray-200 text-left '>Status</th>
              </tr>
            </thead>

            <tbody>
              { 
                jobsApplied.map((job, index) => true
                ? ( 
                    <tr key={index}>
                      <td className='py-3 px-4 flex items-center gap-2 border-b border-gray-200'>
                        <img src={job.logo} alt="" />
                        {job.company}
                      </td>
                      <td className='py-1 px-4 border-b border-gray-200 '>{job.title}</td>
                      <td className='py-1 px-4 border-b border-gray-200 max-sm:hidden'> {job.location}</td>
                      <td className='py-1 px-4 border-b border-gray-200 max-sm:hidden'> { moment(job.date).format('ll') } </td>
                      <td className='py-1 px-4 border-b border-gray-200 '>
                        <span className={` ${job.status==='Accepted'? 'bg-green-200': job.status === 'Rejected' ? 'bg-red-200':'bg-yellow-200'} px-4 py-1.5 rounded`}>{job.status}</span>
                      </td>
                    </tr>
                )
                :(
                  null
                )
              )
              }
            </tbody>
          </table>
       </div>
       <Footer/>
    </>
  )
}

export default Applications
