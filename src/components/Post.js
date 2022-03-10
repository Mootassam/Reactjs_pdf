import React, { useState } from "react";
import PDF from "./PDF";

const Post = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const [postSubmitted, setPostSubmitted] = useState(false);

  const submitPost = (e) => {
    if (!title || !content) {
      alert("All fields are required!");
    } else {
      setPostSubmitted(true);
    }
  };

  return (
    <>
      {!postSubmitted ? (
        <div className='container'>
          <div className='jumbotron mt-3'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='well well-sm'>
                  <form className='form-horizontal' method='post'>
                    <fieldset>
                      <legend className='text-center header'>
                        Hi Mootassam Please a new post here !
                      </legend>
                      <div className='form-group'>
                        <span className='col-md-1 col-md-offset-2 text-center'>
                          <i className='fa fa-user bigicon'></i>
                        </span>
                        <input
                          onChange={(e) => setTitle(e.target.value)}
                          name='title'
                          type='text'
                          placeholder='Post Title'
                          className='form-control'
                        />
                      </div>
                      <div className='form-group'>
                        <span className='col-md-1 col-md-offset-2 text-center'>
                          <i className='fa fa-user bigicon'></i>
                        </span>
                        <input
                          onChange={(e) => setImage(e.target.value)}
                          name='image'
                          type='text'
                          placeholder='https://'
                          className='form-control'
                        />
                      </div>
                      <div className='form-group'>
                        <span className='col-md-1 col-md-offset-2 text-center'>
                          <i className='fa fa-pencil-square-o bigicon'></i>
                        </span>
                        <textarea
                          onChange={(e) => setContent(e.target.value)}
                          className='form-control'
                          name='content'
                          placeholder='Enter your text here'
                          rows='7'></textarea>
                      </div>
                      <div className='form-group'>
                        <button
                          type='button'
                          onClick={() => submitPost()}
                          className='btn btn-primary btn-lg'>
                          Submit
                        </button>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PDF title={title} content={content} image={image} />
      )}
    </>
  );
};

export default Post;
