import { useState, useEffect, useRef } from 'react'
import './App.css'
import projectImage from './assets/project-placeholder.svg'
import headerBg from './assets/header-bg.svg'
import headerBgDark from './assets/header-bg-dark.svg'
import AOS from 'aos'

// Technology icons mapping function
const getTechIcon = (tech) => {
  switch(tech.toLowerCase()) {
    case 'haskell':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="tech-icon">
          <path fill="#453a62" d="M9 43H1l12-18L1 7h8l12 18z"/>
          <path fill="#5e5086" d="M20 7h-8l12 18-12 18h8l8.16-12.24L36 43h8z"/>
          <path fill="#8f4e8b" d="M34.338 24H47v-6H30.338zM40.338 33H47v-6H36.338z"/>
        </svg>
      );
    case 'javascript':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1052 1052" className="tech-icon">
          <path fill="#f0db4f" d="M0 0h1052v1052H0z"/>
          <path d="M965.9 801.1c-7.7-48-39-88.3-131.7-125.9-32.2-14.8-68.1-25.399-78.8-49.8-3.8-14.2-4.3-22.2-1.9-30.8 6.9-27.9 40.2-36.6 66.6-28.6 17 5.7 33.1 18.801 42.8 39.7 45.4-29.399 45.3-29.2 77-49.399-11.6-18-17.8-26.301-25.4-34-27.3-30.5-64.5-46.2-124-45-10.3 1.3-20.699 2.699-31 4-29.699 7.5-58 23.1-74.6 44-49.8 56.5-35.6 155.399 25 196.1 59.7 44.8 147.4 55 158.6 96.9 10.9 51.3-37.699 67.899-86 62-35.6-7.4-55.399-25.5-76.8-58.4-39.399 22.8-39.399 22.8-79.899 46.1 9.6 21 19.699 30.5 35.8 48.7 76.2 77.3 266.899 73.5 301.1-43.5 1.399-4.001 10.6-30.801 3.199-72.101zm-394-317.6h-98.4c0 85-.399 169.4-.399 254.4 0 54.1 2.8 103.7-6 118.9-14.4 29.899-51.7 26.2-68.7 20.399-17.3-8.5-26.1-20.6-36.3-37.699-2.8-4.9-4.9-8.7-5.601-9-26.699 16.3-53.3 32.699-80 49 13.301 27.3 32.9 51 58 66.399 37.5 22.5 87.9 29.4 140.601 17.3 34.3-10 63.899-30.699 79.399-62.199 22.4-41.3 17.6-91.3 17.4-146.6.5-90.2 0-180.4 0-270.9z" fill="#323330"/>
        </svg>
      );
    case 'typescript':
      return (
        <svg viewBox="0 0 256 256" className="tech-icon">
          <path d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z" fill="#3178C6"/>
          <path d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z" fill="#FFF"/>
        </svg>
      );
    case 'python':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="16 16 32 32" className="tech-icon">
          <path fill="url(#a)" d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454a1.394 1.394 0 1 1 0 2.79 1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z"/>
          <path fill="url(#b)" d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395 1.394 1.394 0 1 1 1.395 1.395z"/>
          <defs>
            <linearGradient id="a" x1="19.075" x2="34.898" y1="18.782" y2="34.658" gradientUnits="userSpaceOnUse">
              <stop stopColor="#387EB8"/>
              <stop offset="1" stopColor="#366994"/>
            </linearGradient>
            <linearGradient id="b" x1="28.809" x2="45.803" y1="28.882" y2="45.163" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFE052"/>
              <stop offset="1" stopColor="#FFC331"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case 'c#':
    case 'csharp':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1.43 255.58 290.11" className="tech-icon">
          <path fill="#a179dc" d="M255.57 84.45c0-4.83-1.04-9.1-3.13-12.76a24.4 24.4 0 0 0-9.24-9C209.17 43.05 175.1 23.5 141.1 3.86c-9.17-5.3-18.06-5.1-27.16.27-13.54 7.98-81.35 46.83-101.55 58.53C4.06 67.5.02 74.87 0 84.44v118.37c0 4.72 1 8.9 2.99 12.51 2.05 3.72 5.17 6.82 9.38 9.26 20.21 11.7 88.02 50.55 101.56 58.53 9.11 5.38 18 5.57 27.17.27 34.02-19.64 68.08-39.2 102.1-58.81a24.33 24.33 0 0 0 9.4-9.25c1.99-3.61 2.98-7.8 2.98-12.52l-.01-118.35"/>
          <path fill="#280068" d="M128.18 143.24 2.98 215.33c2.06 3.7 5.18 6.8 9.4 9.25 20.2 11.7 88.01 50.55 101.55 58.53 9.11 5.38 18 5.57 27.17.27 34.02-19.64 68.08-39.2 102.1-58.81a24.33 24.33 0 0 0 9.4-9.25z"/>
          <path fill="#390091" d="M255.57 84.45c0-4.83-1.04-9.1-3.13-12.76l-124.26 71.55 124.41 72.07c2-3.6 2.99-7.79 3-12.51 0 0 0-78.9-.02-118.35"/>
          <g fill="#fff">
            <path d="M201.9 116.3v13.47h13.47v-13.48h6.73v13.48h13.48v6.73H222.1v13.48h13.48v6.74H222.1v13.47h-6.73V156.7h-13.48v13.48h-6.73V156.7h-13.48v-6.73h13.47V136.5h-13.47v-6.74h13.47v-13.48zm13.47 20.2h-13.48v13.48h13.48z"/>
            <path d="M128.46 48.63a94.96 94.96 0 0 1 82.26 47.45l-.16-.27-41.35 23.8A47.28 47.28 0 0 0 129 96.33h-.54a47.3 47.3 0 0 0-47.3 47.3 47.08 47.08 0 0 0 6.23 23.47 47.28 47.28 0 0 0 82.29-.27l-.2.35 41.29 23.91a94.97 94.97 0 0 1-81.25 47.54h-1.06a94.96 94.96 0 0 1-95-95 95 95 0 0 1 95-95z"/>
          </g>
        </svg>
      );
    case 'go':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 207 78" className="tech-icon">
          <g fill="#000000" fillRule="evenodd">
            <path d="m16.2 24.1c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h35.7c.4 0 .5.3.3.6l-1.7 2.6c-.2.3-.7.6-1 .6z"/>
            <path d="m1.1 33.3c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h45.6c.4 0 .6.3.5.6l-.8 2.4c-.1.4-.5.6-.9.6z"/>
            <path d="m25.3 42.5c-.4 0-.5-.3-.3-.6l1.4-2.5c.2-.3.6-.6 1-.6h20c.4 0 .6.3.6.7l-.2 2.4c0 .4-.4.7-.7.7z"/>
            <g transform="translate(55)">
              <path d="m74.1 22.3c-6.3 1.6-10.6 2.8-16.8 4.4-1.5.4-1.6.5-2.9-1-1.5-1.7-2.6-2.8-4.7-3.8-6.3-3.1-12.4-2.2-18.1 1.5-6.8 4.4-10.3 10.9-10.2 19 .1 8 5.6 14.6 13.5 15.7 6.8.9 12.5-1.5 17-6.6.9-1.1 1.7-2.3 2.7-3.7-3.6 0-8.1 0-19.3 0-2.1 0-2.6-1.3-1.9-3 1.3-3.1 3.7-8.3 5.1-10.9.3-.6 1-1.6 2.5-1.6h36.4c-.2 2.7-.2 5.4-.6 8.1-1.1 7.2-3.8 13.8-8.2 19.6-7.2 9.5-16.6 15.4-28.5 17-9.8 1.3-18.9-.6-26.9-6.6-7.4-5.6-11.6-13-12.7-22.2-1.3-10.9 1.9-20.7 8.5-29.3 7.1-9.3 16.5-15.2 28-17.3 9.4-1.7 18.4-.6 26.5 4.9 5.3 3.5 9.1 8.3 11.6 14.1.6.9.2 1.4-1 1.7z"/>
              <path d="m107.2 77.6c-9.1-.2-17.4-2.8-24.4-8.8-5.9-5.1-9.6-11.6-10.8-19.3-1.8-11.3 1.3-21.3 8.1-30.2 7.3-9.6 16.1-14.6 28-16.7 10.2-1.8 19.8-.8 28.5 5.1 7.9 5.4 12.8 12.7 14.1 22.3 1.7 13.5-2.2 24.5-11.5 33.9-6.6 6.7-14.7 10.9-24 12.8-2.7.5-5.4.6-8 .9zm23.8-40.4c-.1-1.3-.1-2.3-.3-3.3-1.8-9.9-10.9-15.5-20.4-13.3-9.3 2.1-15.3 8-17.5 17.4-1.8 7.8 2 15.7 9.2 18.9 5.5 2.4 11 2.1 16.3-.6 7.9-4.1 12.2-10.5 12.7-19.1z" fillRule="nonzero"/>
            </g>
          </g>
        </svg>
      );
    case 'c++':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 288" className="tech-icon">
          <path fill="#649AD2" d="M255.987 84.59c-.002-4.837-1.037-9.112-3.13-12.781-2.054-3.608-5.133-6.632-9.261-9.023-34.08-19.651-68.195-39.242-102.264-58.913-9.185-5.303-18.09-5.11-27.208.27-13.565 8-81.48 46.91-101.719 58.632C4.071 67.6.015 74.984.013 84.58 0 124.101.013 163.62 0 203.141c0 4.73.993 8.923 2.993 12.537 2.056 3.717 5.177 6.824 9.401 9.269 20.24 11.722 88.164 50.63 101.726 58.631 9.121 5.382 18.027 5.575 27.215.27 34.07-19.672 68.186-39.262 102.272-58.913 4.224-2.444 7.345-5.553 9.401-9.267 1.997-3.614 2.992-7.806 2.992-12.539 0 0 0-79.018-.013-118.539"/>
          <path fill="#004482" d="m128.392 143.476-125.4 72.202c2.057 3.717 5.178 6.824 9.402 9.269 20.24 11.722 88.164 50.63 101.726 58.631 9.121 5.382 18.027 5.575 27.215.27 34.07-19.672 68.186-39.262 102.272-58.913 4.224-2.444 7.345-5.553 9.401-9.267l-124.616-72.192"/>
          <path fill="#1A4674" d="M91.25 164.863c7.297 12.738 21.014 21.33 36.75 21.33 15.833 0 29.628-8.7 36.888-21.576l-36.496-21.141-37.142 21.387"/>
          <path fill="#01589C" d="M255.987 84.59c-.002-4.837-1.037-9.112-3.13-12.781l-124.465 71.667 124.616 72.192c1.997-3.614 2.99-7.806 2.992-12.539 0 0 0-79.018-.013-118.539"/>
          <path fill="#FFF" d="M249.135 148.636h-9.738v9.74h-9.74v-9.74h-9.737V138.9h9.737v-9.738h9.74v9.738h9.738v9.737ZM128 58.847c31.135 0 58.358 16.74 73.17 41.709l.444.759-37.001 21.307c-7.333-12.609-20.978-21.094-36.613-21.094-23.38 0-42.333 18.953-42.333 42.332a42.13 42.13 0 0 0 5.583 21.003c7.297 12.738 21.014 21.33 36.75 21.33 15.659 0 29.325-8.51 36.647-21.153l.241-.423 36.947 21.406c-14.65 25.597-42.228 42.851-73.835 42.851-31.549 0-59.084-17.185-73.754-42.707-7.162-12.459-11.26-26.904-11.26-42.307 0-46.95 38.061-85.013 85.014-85.013Zm75.865 70.314v9.738h9.737v9.737h-9.737v9.74h-9.738v-9.74h-9.738V138.9h9.738v-9.738h9.738Z"/>
        </svg>
      );
    case 'unity':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 263" className="tech-icon">
          <path d="M166.9 131.2L212.8 52l22.2 79.2-22.2 79.3-46-79.3zm-22.4 13l46 79.2-80-20.5L52.6 144h91.8zM190.4 39l-45.9 79.3H52.7l57.7-58.8 80-20.5zm65.5 65.2L228 0 123.4 28l-15.5 27.2-31.4-.2L0 131.2l76.5 76.3 31.4-.2 15.5 27.2 104.5 27.9 28-104.2-15.9-27 16-27z" fill="#222C37"/>
        </svg>
      );
    case 'scala':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 416" className="tech-icon">
          <defs>
            <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="scala-a">
              <stop stopColor="#4F4F4F" offset="0%"/>
              <stop offset="100%"/>
            </linearGradient>
            <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="scala-b">
              <stop stopColor="#C40000" offset="0%"/>
              <stop stopColor="red" offset="100%"/>
            </linearGradient>
          </defs>
          <path d="M0 288v-32c0-5 116-14 192-32 37 8 64 19 64 32v32c0 13-27 24-64 32-76-18-192-27-192-32" fill="url(#scala-a)" transform="matrix(1 0 0 -1 0 544)"/>
          <path d="M0 160v-32c0-5 116-14 192-32 37 8 64 19 64 32v32c0 13-27 24-64 32-76-18-192-27-192-32" fill="url(#scala-a)" transform="matrix(1 0 0 -1 0 288)"/>
          <path d="M0 224v-96c0 8 256 24 256 64v96c0-40-256-56-256-64" fill="url(#scala-b)" transform="matrix(1 0 0 -1 0 416)"/>
          <path d="M0 96V0c0 8 256 24 256 64v96c0-40-256-56-256-64" fill="url(#scala-b)" transform="matrix(1 0 0 -1 0 160)"/>
          <path d="M0 352v-96c0 8 256 24 256 64v96c0-40-256-56-256-64" fill="url(#scala-b)" transform="matrix(1 0 0 -1 0 672)"/>
        </svg>
      );
    case 'mysql':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 252" className="tech-icon">
          <path d="M236 194c-14 0-25 1-34 5-3 1-7 1-7 4l3 6c2 3 5 8 9 11l11 8 21 10 11 9 6 4-3-6-5-5c-5-7-11-13-18-18-6-3-18-9-20-15h-1l12-3 18-3 8-2v-2l-9-10c-8-8-18-15-28-22l-18-8c-2-1-6-2-7-4l-7-13-15-30-8-20c-18-30-38-48-68-65-6-4-14-5-22-7l-13-1-8-6C34 5 8-9 1 9c-5 11 7 22 11 28l9 13 3 9c3 8 5 17 9 24l6 10c2 2 4 3 5 6-3 4-3 9-4 13-7 20-4 44 5 59 2 4 9 14 18 10 8-3 6-13 8-22l1-4 8 14c5 9 14 18 22 24 4 3 8 8 13 10l-4-4-9-10c-8-10-14-21-20-32l-7-17-3-6c-3 4-7 7-9 12-3 7-3 17-4 26h-1c-6-1-8-7-10-12-5-12-6-32-1-46 1-4 6-15 4-19-1-3-4-5-6-7l-7-12-10-30-9-13c-3-5-7-8-10-14-1-2-2-5 0-7l2-2c2-2 9 0 11 1 6 3 12 5 17 9l8 6h4c6 1 12 0 17 2 9 3 18 7 25 12 23 14 42 35 54 59 3 4 3 8 5 12l12 26c4 8 7 16 12 23 3 4 14 6 18 8l12 4 18 12c2 2 11 7 12 10Z" fill="#00546B"/>
          <path d="m58 43-7 1 6 7 4 9v-1c3-1 4-4 4-8l-2-4-5-4Z" fill="#00546B"/>
        </svg>
      );
    case 'rust':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224 224" className="tech-icon">
          <path fill="#000" d="M218.46 109.358l-9.062-5.614c-.076-.882-.162-1.762-.258-2.642l7.803-7.265a3.107 3.107 0 00.933-2.89 3.093 3.093 0 00-1.967-2.312l-9.97-3.715c-.25-.863-.512-1.72-.781-2.58l6.214-8.628a3.114 3.114 0 00-.592-4.263 3.134 3.134 0 00-1.431-.637l-10.507-1.709a80.869 80.869 0 00-1.263-2.353l4.417-9.7a3.12 3.12 0 00-.243-3.035 3.106 3.106 0 00-2.705-1.385l-10.671.372a85.152 85.152 0 00-1.685-2.044l2.456-10.381a3.125 3.125 0 00-3.762-3.763l-10.384 2.456a88.996 88.996 0 00-2.047-1.684l.373-10.671a3.11 3.11 0 00-1.385-2.704 3.127 3.127 0 00-3.034-.246l-9.681 4.417c-.782-.429-1.567-.854-2.353-1.265l-1.713-10.506a3.098 3.098 0 00-1.887-2.373 3.108 3.108 0 00-3.014.35l-8.628 6.213c-.85-.27-1.703-.53-2.56-.778l-3.716-9.97a3.111 3.111 0 00-2.311-1.97 3.134 3.134 0 00-2.89.933l-7.266 7.802a93.746 93.746 0 00-2.643-.258l-5.614-9.082A3.125 3.125 0 00111.97 4c-1.09 0-2.085.56-2.642 1.478l-5.615 9.081a93.32 93.32 0 00-2.642.259l-7.266-7.802a3.13 3.13 0 00-2.89-.933 3.106 3.106 0 00-2.312 1.97l-3.715 9.97c-.857.247-1.71.506-2.56.778L73.7 12.588a3.101 3.101 0 00-3.014-.35A3.127 3.127 0 0068.8 14.61l-1.713 10.506c-.79.41-1.575.832-2.353 1.265l-9.681-4.417a3.125 3.125 0 00-4.42 2.95l.372 10.67c-.69.553-1.373 1.115-2.048 1.685l-10.383-2.456a3.143 3.143 0 00-2.93.832 3.124 3.124 0 00-.833 2.93l2.436 10.383a93.897 93.897 0 00-1.68 2.043l-10.672-.372a3.138 3.138 0 00-2.704 1.385 3.126 3.126 0 00-.246 3.035l4.418 9.7c-.43.779-.855 1.563-1.266 2.353l-10.507 1.71a3.097 3.097 0 00-2.373 1.886 3.117 3.117 0 00.35 3.013l6.214 8.628a89.12 89.12 0 00-.78 2.58l-9.97 3.715a3.117 3.117 0 00-1.035 5.202l7.803 7.265c-.098.879-.184 1.76-.258 2.642l-9.062 5.614A3.122 3.122 0 004 112.021c0 1.092.56 2.084 1.478 2.642l9.062 5.614c.074.882.16 1.762.258 2.642l-7.803 7.265a3.117 3.117 0 001.034 5.201l9.97 3.716a110 110 0 00.78 2.58l-6.212 8.627a3.112 3.112 0 00.6 4.27c.419.33.916.547 1.443.63l10.507 1.709c.407.792.83 1.576 1.265 2.353l-4.417 9.68a3.126 3.126 0 002.95 4.42l10.65-.374c.553.69 1.115 1.372 1.685 2.047l-2.435 10.383a3.09 3.09 0 00.831 2.91 3.117 3.117 0 002.931.83l10.384-2.436a82.268 82.268 0 002.047 1.68l-.371 10.671a3.11 3.11 0 001.385 2.704 3.125 3.125 0 003.034.241l9.681-4.416c.779.432 1.563.854 2.353 1.265l1.713 10.505a3.147 3.147 0 001.887 2.395 3.111 3.111 0 003.014-.349l8.628-6.213c.853.271 1.71.535 2.58.783l3.716 9.969a3.112 3.112 0 002.312 1.967 3.112 3.112 0 002.89-.933l7.266-7.802c.877.101 1.761.186 2.642.264l5.615 9.061a3.12 3.12 0 002.642 1.478 3.165 3.165 0 002.663-1.478l5.614-9.061c.884-.078 1.765-.163 2.643-.264l7.265 7.802a3.106 3.106 0 002.89.933 3.105 3.105 0 002.312-1.967l3.716-9.969c.863-.248 1.719-.512 2.58-.783l8.629 6.213a3.12 3.12 0 004.9-2.045l1.713-10.506c.793-.411 1.577-.838 2.353-1.265l9.681 4.416a3.13 3.13 0 003.035-.241 3.126 3.126 0 001.385-2.704l-.372-10.671a81.794 81.794 0 002.046-1.68l10.383 2.436a3.123 3.123 0 003.763-3.74l-2.436-10.382a84.588 84.588 0 001.68-2.048l10.672.374a3.104 3.104 0 002.704-1.385 3.118 3.118 0 00.244-3.035l-4.417-9.68c.43-.779.852-1.563 1.263-2.353l10.507-1.709a3.08 3.08 0 002.373-1.886 3.11 3.11 0 00-.35-3.014l-6.214-8.627c.272-.857.532-1.717.781-2.58l9.97-3.716a3.109 3.109 0 001.967-2.311 3.107 3.107 0 00-.933-2.89l-7.803-7.265c.096-.88.182-1.761.258-2.642l9.062-5.614a3.11 3.11 0 001.478-2.642 3.157 3.157 0 00-1.476-2.663h-.064zm-60.687 75.337c-3.468-.747-5.656-4.169-4.913-7.637a6.412 6.412 0 017.617-4.933c3.468.741 5.676 4.169 4.933 7.637a6.414 6.414 0 01-7.617 4.933h-.02zm-3.076-20.847c-3.158-.677-6.275 1.334-6.936 4.5l-3.22 15.026c-9.929 4.5-21.055 7.018-32.614 7.018-11.89 0-23.12-2.622-33.234-7.328l-3.22-15.026c-.677-3.158-3.778-5.18-6.936-4.499l-13.273 2.848a80.222 80.222 0 01-6.853-8.091h64.61c.731 0 1.218-.132 1.218-.797v-22.91c0-.665-.487-.797-1.218-.797H94.133v-14.469h20.415c1.864 0 9.97.533 12.551 10.898.811 3.179 2.601 13.54 3.818 16.863 1.214 3.715 6.152 11.146 11.415 11.146h32.202c.365 0 .755-.041 1.166-.116a80.56 80.56 0 01-7.307 8.587l-13.583-2.911-.113.058zm-89.38 20.537a6.407 6.407 0 01-7.617-4.933c-.74-3.467 1.462-6.894 4.934-7.637a6.417 6.417 0 017.617 4.933c.74 3.468-1.464 6.894-4.934 7.637zm-24.564-99.28a6.438 6.438 0 01-3.261 8.484c-3.241 1.438-7.019-.025-8.464-3.261-1.445-3.237.025-7.039 3.262-8.483a6.416 6.416 0 018.463 3.26zM33.22 102.94l13.83-6.15c2.952-1.311 4.294-4.769 2.972-7.72l-2.848-6.44H58.36v50.362h-22.5a79.158 79.158 0 01-3.014-21.672c0-2.869.155-5.697.452-8.483l-.08.103zm60.687-4.892v-14.86h26.629c1.376 0 9.722 1.59 9.722 7.822 0 5.18-6.399 7.038-11.663 7.038h-24.77.082zm96.811 13.375c0 1.973-.072 3.922-.216 5.862h-8.113c-.811 0-1.137.532-1.137 1.327v3.715c0 8.752-4.934 10.671-9.268 11.146-4.129.464-8.691-1.726-9.248-4.252-2.436-13.684-6.482-16.595-12.881-21.672 7.948-5.036 16.204-12.487 16.204-22.498 0-10.753-7.369-17.523-12.385-20.847-7.059-4.644-14.862-5.572-16.968-5.572H52.899c11.374-12.673 26.835-21.673 44.174-24.975l9.887 10.361a5.849 5.849 0 008.278.19l11.064-10.568c23.119 4.314 42.729 18.721 54.082 38.598l-7.576 17.09c-1.306 2.951.027 6.419 2.973 7.72l14.573 6.48c.255 2.607.383 5.224.384 7.843l-.021.052zM106.912 24.94a6.398 6.398 0 019.062.209 6.437 6.437 0 01-.213 9.082 6.396 6.396 0 01-9.062-.21 6.436 6.436 0 01.213-9.083v.002zm75.137 60.476a6.402 6.402 0 018.463-3.26 6.425 6.425 0 013.261 8.482 6.402 6.402 0 01-8.463 3.261 6.425 6.425 0 01-3.261-8.483z"/>
        </svg>
      );
    case 'bash scripts':
    case 'bash':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="tech-icon">
          <path fill="#1b1b1f" fillRule="evenodd" d="M28.057 6.53 17.952.532a3.8 3.8 0 0 0-3.88 0L3.965 6.53A4.03 4.03 0 0 0 2 10.002v11.996a4.03 4.03 0 0 0 1.948 3.472l10.105 5.998a3.8 3.8 0 0 0 3.88 0L28.04 25.47a4.03 4.03 0 0 0 1.948-3.472V10.002a4.03 4.03 0 0 0-1.93-3.472zM20.23 25.262v.86a.318.318 0 0 1-.148.265l-.512.293c-.08.042-.148 0-.148-.113v-.847a1.66 1.66 0 0 1-1.164.113c-.062-.042-.086-.122-.056-.2l.183-.78a.322.322 0 0 1 .102-.17.18.18 0 0 1 .05-.035.11.11 0 0 1 .08 0 1.41 1.41 0 0 0 1.059-.134 1.41 1.41 0 0 0 .79-1.21c0-.438-.24-.62-.82-.625-.734 0-1.4-.14-1.43-1.224a3.137 3.137 0 0 1 1.186-2.4v-.872a.34.34 0 0 1 .148-.268l.494-.314c.08-.042.148 0 .148.116v.872a1.61 1.61 0 0 1 .967-.116c.07.04.098.128.064.2l-.173.773a.325.325 0 0 1-.138.195c-.02.012-.05.008-.074 0a1.28 1.28 0 0 0-.931.152 1.17 1.17 0 0 0-.706 1.037c0 .395.208.515.907.53.935 0 1.337.423 1.348 1.362a3.346 3.346 0 0 1-1.228 2.53zm5.293-1.45a.201.201 0 0 1-.078.194L22.9 25.558c-.024.02-.06.023-.087.007s-.04-.05-.033-.08v-.66a.184.184 0 0 1 .116-.162l2.516-1.507c.024-.02.06-.023.087-.007s.04.05.033.08v.582zM27.288 9.06l-9.562 5.906c-1.193.706-2.07 1.478-2.07 2.914v11.778c0 .86.353 1.4.882 1.58a3.14 3.14 0 0 1-.53.053 3.13 3.13 0 0 1-1.595-.441L4.308 24.853A3.3 3.3 0 0 1 2.706 22V10.002a3.304 3.304 0 0 1 1.602-2.858l10.105-5.998c.98-.58 2.196-.58 3.176 0l10.105 5.998c.833.504 1.4 1.35 1.552 2.3-.328-.713-1.083-.9-1.962-.395h.003z"/>
        </svg>
      );
    case 'happy':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="tech-icon">
          <circle cx="12" cy="12" r="10" fill="#FFC857" stroke="#2C3E50" strokeWidth="2"/>
          <path d="M8 13a4 4 0 008 0h-8z" fill="#2C3E50"/>
          <circle cx="8.5" cy="9.5" r="1.5" fill="#2C3E50"/>
          <circle cx="15.5" cy="9.5" r="1.5" fill="#2C3E50"/>
        </svg>
      );
    case 'tor':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="tech-icon">
          <defs>
            <linearGradient id="tor-a" x1="50%" x2="50%" y1="100%" y2="0%">
              <stop offset="0%" stopColor="#420C5D"/>
              <stop offset="100%" stopColor="#951AD1"/>
            </linearGradient>
            <linearGradient id="tor-b" x1="50%" x2="50%" y1="100%" y2="0%">
              <stop offset="0%" stopColor="#420C5D"/>
              <stop offset="100%" stopColor="#951AD1"/>
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="11" fill="#F2E4FF"/>
          <path fill="url(#tor-a)" d="M12 22v-1.5c4.7 0 8.5-3.8 8.5-8.5S16.7 3.5 12 3.5V2c5.5 0 10 4.5 10 10s-4.5 10-10 10zm0-5.2c2.7 0 4.8-2.2 4.8-4.8S14.7 7.2 12 7.2V5.7c3.5 0 6.3 2.8 6.3 6.3S15.5 18.3 12 18.3v-1.5zm0-7.4c1.4 0 2.6 1.2 2.6 2.6S13.4 14.6 12 14.6v-5.2zM2 12C2 17.5 6.5 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12z"/>
          <path fill="url(#tor-b)" d="M3.2 3.4C9.3 3.4 14.2 8.3 14.2 14.2S9.3 25 3.2 25V3.4z" transform="matrix(-1 0 0 1 15.4 -2)"/>
        </svg>
      );
    case 'github actions':
    case 'github':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="tech-icon">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#181717"/>
        </svg>
      );
    case 'google cloud':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="tech-icon">
          <path d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.5 2.5 0 0 1-1.833-.715 2.492 2.492 0 0 1-.582-2.05 2.5 2.5 0 0 1 2.198-1.88c0-.17.013-.339.042-.505a5.188 5.188 0 0 1 5.022-5.749l.035-.009h.165z" fill="#4285F4"/>
        </svg>
      );
    case 'java':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 346" className="tech-icon">
          <path d="M83 267s-14 8 9 11c27 3 41 2 71-3 0 0 8 5 19 9-67 29-153-2-99-17M74 230s-15 11 8 13c29 3 52 3 92-4 0 0 6 5 15 8-82 24-173 2-115-17" fill="#5382A1"/>
          <path d="M144 166c17 19-4 36-4 36s42-22 22-49c-18-26-32-38 44-82 0 0-119 29-62 95" fill="#E76F00"/>
          <path d="M233 295s10 8-10 15c-39 12-163 15-197 0-12-5 11-13 18-14l12-2c-14-9-89 19-38 28 138 22 251-10 215-27M89 190s-63 15-22 21c17 2 51 2 83-1 26-2 52-7 52-7l-16 9c-64 16-187 8-151-9 30-14 54-13 54-13M202 253c64-33 34-66 13-61l-7 2s2-3 6-5c41-14 73 43-14 66l2-2" fill="#5382A1"/>
          <path d="M162 0s36 36-34 91c-56 45-12 70 0 99-32-30-56-56-40-80 23-35 89-53 74-110" fill="#E76F00"/>
          <path d="M95 345c62 4 158-3 160-32 0 0-4 11-51 20-53 10-119 9-158 2 0 0 8 7 49 10" fill="#5382A1"/>
        </svg>
      );
    case 'lua':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="tech-icon">
          <circle cx="12" cy="12" r="11" fill="#000080"/>
          <circle cx="17" cy="7" r="3" fill="#FFFFFF"/>
          <circle cx="7" cy="7" r="3" fill="#000080"/>
        </svg>
      );
    default:
      return null;
  }
};

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [darkMode, setDarkMode] = useState(false)
  const cursorGlowRef = useRef(null)
  const textCursorRef = useRef(null)

  // Handle cursor glow effect
  useEffect(() => {
    // Check if device has hover capability (not a touch device)
    const hasHover = window.matchMedia('(hover: hover)').matches
    if (!hasHover) return // Don't apply cursor effects on touch devices

    // Create cursor glow element
    const cursorGlow = document.createElement('div')
    cursorGlow.classList.add('cursor-glow')
    document.body.appendChild(cursorGlow)
    cursorGlowRef.current = cursorGlow

    // Create text cursor element
    const textCursor = document.createElement('div')
    textCursor.classList.add('text-cursor')
    document.body.appendChild(textCursor)
    textCursorRef.current = textCursor

    const handleMouseMove = (e) => {
      // Update cursor glow position with slight delay for smooth effect
      requestAnimationFrame(() => {
        cursorGlow.style.left = `${e.clientX}px`
        cursorGlow.style.top = `${e.clientY}px`

        // Update text cursor position immediately for precision
        textCursor.style.left = `${e.clientX}px`
        textCursor.style.top = `${e.clientY}px`
      })
    }

    const handleMouseDown = () => {
      cursorGlow.classList.add('active')

      // Make text cursor larger on click
      textCursor.style.width = '8px'
      textCursor.style.height = '8px'
    }

    const handleMouseUp = () => {
      if (!isHoveringInteractive) {
        cursorGlow.classList.remove('active')
      }

      // Reset text cursor size
      textCursor.style.width = '6px'
      textCursor.style.height = '6px'
    }

    // Track if currently hovering over an interactive element
    let isHoveringInteractive = false

    const handleMouseEnter = (e) => {
      if (isInteractiveElement(e.target)) {
        isHoveringInteractive = true
        cursorGlow.classList.add('active')
      }
    }

    const handleMouseLeave = (e) => {
      if (isInteractiveElement(e.target)) {
        isHoveringInteractive = false
        cursorGlow.classList.remove('active')
        // Reset cursor type when leaving interactive elements
        document.body.removeAttribute('data-cursor')
      }
    }

    // Helper function to check if element is interactive
    const isInteractiveElement = (element) => {
      const interactiveTags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT']

      // Handle text input elements
      if(['INPUT', 'TEXTAREA'].includes(element.tagName)) {
        document.body.setAttribute('data-cursor', 'text')
        return true
      }

      // Handle buttons and links
      if(element.tagName === 'A' ||
         element.tagName === 'BUTTON' ||
         element.closest('a') ||
         element.closest('button') ||
         element.getAttribute('role') === 'button' ||
         element.classList.contains('project-card') ||
         element.classList.contains('skill-tag') ||
         element.classList.contains('social-link')) {
        document.body.setAttribute('data-cursor', 'button')
        return true
      }

      // Handle media elements
      if(element.tagName === 'IMG' ||
         element.tagName === 'VIDEO' ||
         element.tagName === 'svg' ||
         element.classList.contains('project-image') ||
         element.closest('.project-image')) {
        document.body.setAttribute('data-cursor', 'media')
        return true
      }

      // Reset cursor type to default
      document.body.removeAttribute('data-cursor')

      return interactiveTags.includes(element.tagName) ||
             element.closest('a') ||
             element.closest('button') ||
             element.getAttribute('role') === 'button'
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    // Use event delegation for interactive elements
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)

    // Hide cursor when leaving the window
    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0'
      textCursor.style.opacity = '0'
    })

    document.addEventListener('mouseenter', () => {
      cursorGlow.style.opacity = '0.7'
      textCursor.style.opacity = '1'
    })

    // Clean up on component unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
      document.removeEventListener('mouseleave', () => {})
      document.removeEventListener('mouseenter', () => {})

      if (cursorGlowRef.current) {
        document.body.removeChild(cursorGlowRef.current)
      }

      if (textCursorRef.current) {
        document.body.removeChild(textCursorRef.current)
      }
    }
  }, [])

  // Handle section changes with smooth scrolling
  const changeSection = (section) => {
    setActiveSection(section)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    // Refresh AOS animations when changing sections
    setTimeout(() => {
      AOS.refresh()
    }, 200)
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Initialize AOS when component mounts or section changes
  useEffect(() => {
    AOS.refresh();
  }, [activeSection]);

  // Add or remove dark-mode class on the document body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  // Check for user's system preference for dark mode
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(prefersDarkMode)
  }, [])

  return (
    <div className="portfolio">
      <header>
        <h1>William Welden</h1>
        <nav>
          <ul>
            <li className={activeSection === 'home' ? 'active' : ''}>
              <button onClick={() => changeSection('home')}>Home</button>
            </li>
            <li className={activeSection === 'projects' ? 'active' : ''}>
              <button onClick={() => changeSection('projects')}>Projects</button>
            </li>
            <li className={activeSection === 'skills' ? 'active' : ''}>
              <button onClick={() => changeSection('skills')}>Skills</button>
            </li>
            <li className={activeSection === 'experience' ? 'active' : ''}>
              <button onClick={() => changeSection('experience')}>Experience</button>
            </li>
            <li className={activeSection === 'education' ? 'active' : ''}>
              <button onClick={() => changeSection('education')}>Education</button>
            </li>
            <li>
              <button className="book-call-button" onClick={() => changeSection('contact')}>Contact</button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {activeSection === 'home' && <Home changeSection={changeSection} darkMode={darkMode} />}
        {activeSection === 'projects' && <Projects />}
        {activeSection === 'skills' && <Skills />}
        {activeSection === 'experience' && <Experience />}
        {activeSection === 'education' && <Education />}
        {activeSection === 'contact' && <Contact />}
      </main>

      <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm9 9h-1a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2zm-9 9a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zM3 11a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2H3zm9-8a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-7.7 14.3a1 1 0 0 0-1.4 1.4l.7.7a1 1 0 0 0 1.4-1.4l-.7-.7zM5.3 5.3a1 1 0 0 0 1.4-1.4l-.7-.7a1 1 0 0 0-1.4 1.4l.7.7zm13.4 13.3a1 1 0 0 0-1.4 1.4l.7.7a1 1 0 0 0 1.4-1.4l-.7-.7zm2.1-14.6-.7.7a1 1 0 0 0 1.4 1.4l.7-.7a1 1 0 1 0-1.4-1.4z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z" />
          </svg>
        )}
      </button>

      <footer>
        <p>&copy; {new Date().getFullYear()} William Welden</p>
        <div className="social-links">
          <a href="https://github.com/wwelden" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="social-icon">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#181717"/>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/william-welden-256294292/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="social-icon">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  )
}

function Home({ changeSection, darkMode }) {
  // Use the darkMode prop directly
  const currentHeaderBg = darkMode ? headerBgDark : headerBg

  return (
    <section className="home">
      <div className="hero" style={{ backgroundImage: `url(${currentHeaderBg})` }}>
        <div className="hero-content" data-aos="fade-up" data-aos-duration="1000">
          <h2>Software Developer & Computer Science Student</h2>
          <p>Welcome to my portfolio! I'm a Computer Science student at Trinity University with experience in a variety of programming languages and technologies.</p>
          <div className="cta-buttons">
            <button
              className="cta-button"
              onClick={() => changeSection('projects')}
            >
              View My Projects
            </button>
            <a href="mailto:wwelden@trinity.edu" className="cta-button secondary">Contact Me</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  // Group projects to manage animations better
  const calculateDelay = (index) => {
    // Create a staggered effect with a reasonable max delay
    return Math.min(index % 4, 3) * 150
  }

  const projects = [
    {
      title: "British Programming Language",
      description: "An esoteric programming language developed in Haskell featuring British-inspired keywords, complete with lexer, parser, and evaluator components.",
      techStack: ["Haskell", "Happy", "Alex"],
      github: "https://github.com/wwelden/British",
      skills: ["Functional programming", "Lambda calculus", "Type Systems", "Language design", "Grammar Specification"]
    },
    {
      title: "Chefs Vs. Aliens",
      description: "A parody tower defense game developed with Unity in C# based on Plants Vs. Zombies with a twist.",
      techStack: ["C#", "Unity", "Pixelmator pro"],
      github: "https://github.com/JorgeFLarach/CVA",
      skills: ["Team work", "Git", "Object oriented programming", "Resolving merge conflicts", "Git ignore files", "Using game engines"]
    },
    {
      title: "Blue Dog Shopping",
      description: "A simulation of a pet store website with a vendor page to add, remove, and adjust product information accessible through login only.",
      techStack: ["JavaScript", "mySQL", "EJS"],
      github: "https://github.com/jbrigham01/PetSmartest",
      skills: ["Web servers", "Frontend Web Dev", "Managing a git hub project"]
    },
    {
      title: "Keystroke",
      description: "A markdown parser that converts markdown to HTML.",
      techStack: ["TypeScript"],
      github: "https://github.com/wwelden/Keystroke",
      skills: ["Interpreter design"]
    },
    {
      title: "Black Jack",
      description: "A black jack game with card animations and card type selector.",
      techStack: ["C#", "Unity"],
      github: "https://github.com/GameDevelopment-F24/Welden-Blackjack",
      skills: ["Sprite animations", "Game development"]
    },
    {
      title: "Asteroids",
      description: "A clone of the classic arcade game Asteroids.",
      techStack: ["C#", "Unity"],
      github: "https://github.com/GameDevelopment-F24/Welden-Asteroids",
      skills: ["Game physics", "Collision detection", "Game development"]
    },
    {
      title: "Sokoban",
      description: "A clone of the classic arcade game Sokoban featuring puzzle mechanics.",
      techStack: ["C#", "Unity"],
      github: "https://github.com/GameDevelopment-F24/Welden-Sokoban",
      skills: ["Tilemaps", "Game development", "Puzzle design"]
    },
    {
      title: "Space Game",
      description: "A Galaga clone with additional features built without a game engine.",
      techStack: ["Scala", "Metals"],
      github: "https://github.com/wwelden/SpaceGame",
      skills: ["Game development without a game engine", "Data structures", "Game architecture"]
    },
    {
      title: "DarkWeb Scraper",
      description: "A web scraper for securely searching leaked data on the dark web, developed for a Computer and Network Security course.",
      techStack: ["Python", "Tor", "VPN", "Kahli Linux VM", "Bash scripts"],
      github: "https://github.com/wwelden/Dark-Web-Crawler",
      skills: ["Bash scripts", "Team work", "Web scraping", "Cyber Security"]
    },
    {
      title: "TIPC Compiler",
      description: "A compiler project that transforms low-level ILOC instructions into optimized assembly code with register allocation and dependency-based scheduling.",
      techStack: ["C++"],
      github: "https://github.com/wwelden/Compilers",
      skills: ["Compiler design", "Code optimization", "Assembly"]
    },
    {
      title: "Go Interpreter",
      description: "An interpreter written in Go supporting a C++-like language called Monkey, following Thorsten Ball's book.",
      techStack: ["Go"],
      github: "https://github.com/wwelden/Go-Interpreter",
      skills: ["Reinforcing compiler design concepts", "Interpreter design", "Language parsing"]
    },
    {
      title: "Connect 4",
      description: "A terminal-based Connect 4 game with AI opponent developed in Haskell.",
      techStack: ["Haskell"],
      github: "https://github.com",
      skills: ["Github", "Git", "Functional Programming", "Game AI"]
    },
    {
      title: "Programming Language Benchmark",
      description: "Comparative study of 21 different programming languages by implementing the same program and timing execution.",
      techStack: ["Multiple languages", "Bash scripts"],
      github: "https://github.com/wwelden/Loop-Speed-Benchmark",
      skills: ["Bash scripts", "Executable files", "Setting up multiple languages and compilers"]
    }
  ]

  return (
    <section className="projects">
      <h2 data-aos="fade-right" data-aos-once="true">Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            className="project-card"
            key={index}
            data-aos="fade-up"
            data-aos-delay={calculateDelay(index)}
            data-aos-duration="800"
            data-aos-once="true"
          >
            <div className="project-image">
              <img src={projectImage} alt={project.title} />
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-stack">
              {project.techStack.map((tech, i) => (
                <span className="tech-tag" key={i}>
                  {getTechIcon(tech)}
                  {tech}
                </span>
              ))}
            </div>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">View on GitHub</a>
          </div>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  const skillCategories = [
    {
      category: "Proficient Languages",
      skills: [
        {name: "Go", icon: getTechIcon("go")},
        {name: "C#", icon: getTechIcon("c#")},
        {name: "Haskell", icon: getTechIcon("haskell")},
        {name: "JavaScript", icon: getTechIcon("javascript")},
        {name: "Java", icon: getTechIcon("java")},
        {name: "Scala", icon: getTechIcon("scala")}
      ]
    },
    {
      category: "Somewhat Proficient Languages",
      skills: [
        {name: "Rust", icon: getTechIcon("rust")},
        {name: "C++", icon: getTechIcon("c++")},
        {name: "Python", icon: getTechIcon("python")},
        {name: "TypeScript", icon: getTechIcon("typescript")},
        {name: "Lua", icon: getTechIcon("lua")}
      ]
    },
    {
      category: "Technologies",
      skills: [
        {name: "Unity", icon: getTechIcon("unity")},
        {name: "GitHub", icon: getTechIcon("github")},
        {name: "GitHub Actions", icon: getTechIcon("github actions")},
        {name: "Bash scripts", icon: getTechIcon("bash")},
        {name: "Google Cloud", icon: getTechIcon("google cloud")}
      ]
    }
  ]

  return (
    <section className="skills">
      <h2 data-aos="fade-right" data-aos-once="true">Skills & Technologies</h2>
      <div className="skills-container">
        {skillCategories.map((category, index) => (
          <div
            className="skill-category"
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            data-aos-duration="800"
            data-aos-once="true"
          >
            <h3>{category.category}</h3>
            <div className="skill-tags">
              {category.skills.map((skill, i) => (
                <span className="skill-tag" key={i}>
                  {skill.icon}
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="experience">
      <h2 data-aos="fade-right" data-aos-once="true">Professional Experience</h2>
      <div
        className="experience-card"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-once="true"
      >
        <h3>Open Source Contributor</h3>
        <p className="company"><a href="https://github.com/amida-tech/blue-button" target="_blank" rel="noopener noreferrer">Blue Button Project</a></p>
        <p className="duration">One Semester</p>
        <p>Contributed to the <a href="https://github.com/TU-SSP-blue-button/blue-button" target="_blank" rel="noopener noreferrer">Blue Button</a> open source XML/JSON conversion library:</p>
        <ul>
          <li>Updated dependencies to modernize the codebase</li>
          <li>Fixed bugs to improve functionality</li>
          <li>Implemented GitHub Actions for automated CI/CD</li>
          <li>Collaborated with team members on project goals</li>
        </ul>
      </div>
    </section>
  )
}

function Education() {
  const courses = [
    "Discrete Structures",
    "Principles of Computer Science",
    "Principles of Computer Science 2",
    "Principles of Data Abstraction",
    "Principles of Functional Languages",
    "Engineering Analysis & Design",
    "Principles of Computer Design",
    "Principles of Theoretical Computer Science",
    "Compiler Construction",
    "Principles of Programming Languages",
    "Principles of Algorithms",
    "Calculus I",
    "Web Application Design",
    "Principles of Software Engineering",
    "Intro to Game Development",
    "Senior Software Project I",
    "Principles of Operating Systems",
    "Computer and Network Security"
  ]

  // Function to calculate reasonable delays for course items
  const calculateCourseDelay = (index) => {
    return Math.min(index % 6, 5) * 50
  }

  return (
    <section className="education">
      <h2 data-aos="fade-right" data-aos-once="true">Education</h2>
      <div
        className="education-card"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-once="true"
      >
        <h3>Bachelor of Science in Computer Science</h3>
        <p className="institution">
          <a href="https://www.trinity.edu/" target="_blank" rel="noopener noreferrer">
            Trinity University
          </a>
        </p>
        <p>Expected Graduation: May, 2026</p>
      </div>

      <h3 data-aos="fade-right" data-aos-once="true">Relevant Coursework</h3>
      <div className="courses-grid">
        {courses.map((course, index) => (
          <div
            className="course-item"
            key={index}
            data-aos="fade-up"
            data-aos-delay={calculateCourseDelay(index)}
            data-aos-duration="600"
            data-aos-once="true"
          >
            {course}
          </div>
        ))}
      </div>

      <h3 data-aos="fade-right" data-aos-once="true">Certifications</h3>
      <div
        className="certification-item"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-once="true"
      >
        <p>Expert Excel Certified</p>
      </div>
    </section>
  )
}

function Contact() {
  const downloadResume = () => {
    // Create a link to download the Resume.html file
    const link = document.createElement('a');
    link.href = '/resume.html'; // Assuming you'll place it in the public folder
    link.download = 'William_Welden_Resume.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="contact">
      <h2 data-aos="fade-right" data-aos-once="true">Contact Me</h2>
      <div className="contact-info">
        <div
          className="contact-item"
          data-aos="fade-up"
          data-aos-delay="0"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <h3>Email</h3>
          <p><a href="mailto:wwelden@trinity.edu">wwelden@trinity.edu</a></p>
        </div>
        <div
          className="contact-item"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <h3>Phone</h3>
          <p>(404) 432-3353</p>
        </div>
        <div
          className="contact-item"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <h3>Location</h3>
          <p>San Antonio, TX</p>
        </div>
      </div>
      <div
        className="download-resume"
        data-aos="fade-up"
        data-aos-delay="150"
        data-aos-duration="800"
        data-aos-once="true"
      >
        <button onClick={downloadResume} className="resume-button">
          Download Resume
        </button>
      </div>
      <div
        className="social-links-large"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="800"
        data-aos-once="true"
      >
        <a href="https://github.com/wwelden" target="_blank" rel="noopener noreferrer" className="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="social-icon-large">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/william-welden-256294292/" target="_blank" rel="noopener noreferrer" className="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="social-icon-large">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
      </div>
    </section>
  )
}

export default App
