import React from 'react'
import { useNavigation } from 'react-router-dom'

const SubmitBtn = ({text}) => {
    const navigation = useNavigation();
    let isSubmitting = false;

    if(navigation.state === 'submitting'){
        isSubmitting = true;
    }
  return (
    <button type='submit' className='btn bg-info w-full rounded-box hover:bg-black hover:text-white' disabled={isSubmitting}>
        {isSubmitting ? (
            <>
                <span className='loading loading-spinner'></span>
                Sending
            </>
        ) : (
            text || 'submit'
        )}
    </button>
  )
}

export default SubmitBtn