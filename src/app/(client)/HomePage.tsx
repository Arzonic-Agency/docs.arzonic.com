import Sidebar from '@/components/client/layout/SideBar'
import React from 'react'

const HomePage = () => {
  return (
    <div className='flex flex-row'>
        <aside className='flex-1/6'>
          <Sidebar />

        </aside>
        <section className='flex-5/6 w-full h-full bg-base-100 overflow-y-auto'>
            <div className='p-6'>
                <h1 className='text-2xl font-bold mb-4'>Welcome to Arzonic Docs</h1>
                <p className='text-base-content/70'>
                Vi tilbyder skræddersyede løsninger til dine behov, uanset om det er en simpel hjemmeside eller en kompleks webapplikation. Vores team af eksperter er klar til at hjælpe dig med at realisere dine digitale drømme.
                </p>
            </div>
        </section>
    </div>
  )
}

export default HomePage