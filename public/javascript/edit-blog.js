//function for editing blog
const editFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('input[name="blog-title"]').value.trim();
    const body = document.querySelector('textarea[name="blog-body"]').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  //addEventListener to edit blog form
  document.querySelector('.edit-blog-form').addEventListener('submit', editFormHandler);