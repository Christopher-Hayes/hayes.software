var e = /^([\w-_]+)\/([\w-_.]+)$/i
const t = (function () {
    const t = Object.fromEntries(new URL(location.href).searchParams)
    let n = null,
      s = null
    if ('issue-term' in t) {
      if (((n = t['issue-term']), void 0 !== n)) {
        if ('' === n)
          throw new Error('When issue-term is specified, it cannot be blank.')
        if (-1 !== ['title', 'url', 'pathname', 'og:title'].indexOf(n)) {
          if (!t[n]) throw new Error(`Unable to find "${n}" metadata.`)
          n = t[n]
        }
      }
    } else {
      if (!('issue-number' in t))
        throw new Error('"issue-term" or "issue-number" must be specified.')
      if (((s = +t['issue-number']), s.toString(10) !== t['issue-number']))
        throw new Error(`issue-number is invalid. "${t['issue-number']}`)
    }
    if (!('repo' in t)) throw new Error('"repo" is required.')
    if (!('origin' in t)) throw new Error('"origin" is required.')
    const r = e.exec(t.repo)
    if (null === r) throw new Error(`Invalid repo: "${t.repo}"`)
    return {
      owner: r[1],
      repo: r[2],
      issueTerm: n,
      issueNumber: s,
      origin: t.origin,
      url: t.url,
      title: t.title,
      description: t.description,
      label: t.label,
      theme: t.theme || 'github-light',
      session: t.session,
    }
  })(),
  n = { value: null }
function s(e) {
  return `https://api.utteranc.es/authorize?${new URLSearchParams({
    redirect_uri: e,
  })}`
}
const r = ['+1', '-1', 'laugh', 'hooray', 'confused', 'heart', 'rocket', 'eyes']
let i, o
function a(e, t) {
  ;((t = t || {}).mode = 'cors'), (t.cache = 'no-cache')
  const s = new Request('https://api.github.com/' + e, t)
  return (
    s.headers.set('Accept', 'application/vnd.github.v3+json'),
    null !== n.value && s.headers.set('Authorization', `token ${n.value}`),
    s
  )
}
const l = {
  standard: { limit: Number.MAX_VALUE, remaining: Number.MAX_VALUE, reset: 0 },
  search: { limit: Number.MAX_VALUE, remaining: Number.MAX_VALUE, reset: 0 },
}
function c(e) {
  return fetch(e).then(
    (t) => (
      401 === t.status && (n.value = null),
      403 === t.status &&
        t.json().then((e) => {
          'Resource not accessible by integration' === e.message &&
            window.dispatchEvent(new CustomEvent('not-installed'))
        }),
      (function (e) {
        const t = e.headers.get('X-RateLimit-Limit'),
          n = e.headers.get('X-RateLimit-Remaining'),
          s = e.headers.get('X-RateLimit-Reset'),
          r = /\/search\//.test(e.url),
          i = r ? l.search : l.standard
        if (
          ((i.limit = +t),
          (i.remaining = +n),
          (i.reset = +s),
          403 === e.status && 0 === i.remaining)
        ) {
          const e = new Date(0)
          e.setUTCSeconds(i.reset)
          const t = Math.round((e.getTime() - new Date().getTime()) / 1e3 / 60),
            n = r ? 'search API' : 'non-search APIs'
          console.warn(
            `Rate limit exceeded for ${n}. Resets in ${t} minute${
              1 === t ? '' : 's'
            }.`,
          )
        }
      })(t),
      'GET' === e.method &&
      -1 !== [401, 403].indexOf(t.status) &&
      e.headers.has('Authorization')
        ? (e.headers.delete('Authorization'), c(e))
        : t
    ),
  )
}
function h(e, t = !1) {
  const n = a(`repos/${i}/${o}/contents/${e}?ref=master`)
  return (
    t && n.headers.set('accept', 'application/vnd.github.VERSION.html'),
    c(n)
      .then((n) => {
        if (404 === n.status)
          throw new Error(
            `Repo "${i}/${o}" does not have a file named "${e}" in the "master" branch.`,
          )
        if (!n.ok) throw new Error(`Error fetching ${e}.`)
        return t ? n.text() : n.json()
      })
      .then((e) => {
        if (t) return e
        const { content: n } = e,
          s =
            ((r = (r = n).replace(/\s/g, '')),
            decodeURIComponent(escape(atob(r))))
        var r
        return JSON.parse(s)
      })
  )
}
function u(e, t) {
  const n = (function (e, t) {
    const n = a(`repos/${i}/${o}/issues/${e}/comments?page=${t}&per_page=25`)
    return (
      n.headers.set(
        'Accept',
        'application/vnd.github.VERSION.html+json,application/vnd.github.v3+json',
      ),
      n
    )
  })(e, t)
  return c(n).then((e) => {
    if (!e.ok) throw new Error('Error fetching comments.')
    return e.json()
  })
}
const d = [
    1e3,
    'second',
    6e4,
    'minute',
    36e5,
    'hour',
    864e5,
    'day',
    6048e5,
    'week',
    23328e5,
    'month',
  ],
  m = { month: 'short', day: 'numeric', year: 'numeric' }
let p
let g = -1
function v() {
  const e = document.body.scrollHeight
  if (e === g) return
  g = e
  const t = { type: 'resize', height: e }
  parent.postMessage(t, p)
}
let f = 0
function b() {
  const e = Date.now()
  e - f > 50 && ((f = e), setTimeout(v, 50))
}
const w = {
    '+1': 'Thumbs Up',
    '-1': 'Thumbs Down',
    laugh: 'Laugh',
    hooray: 'Hooray',
    confused: 'Confused',
    heart: 'Heart',
    rocket: 'Rocket',
    eyes: 'Eyes',
  },
  y = {
    '+1': '👍',
    '-1': '👎',
    laugh: '️😂',
    hooray: '️🎉',
    confused: '😕',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀',
  }
function $(e, t, n, s) {
  return `\n  <button\n    reaction\n    type="submit"\n    action="javascript:"\n    formaction="${e}"\n    class="btn BtnGroup-item reaction-button"\n    value="${t}"\n    aria-label="Toggle ${
    w[t]
  } reaction"\n    reaction-count="${s}"\n    ${n ? 'disabled' : ''}>\n    ${
    y[t]
  }\n  </button>`
}
function E(e) {
  addEventListener(
    'click',
    async (t) => {
      const n = t.target instanceof HTMLElement && t.target.closest('button')
      if (!n) return
      if (!n.hasAttribute('reaction')) return
      if ((t.preventDefault(), !e)) return
      n.disabled = !0
      const s = n.closest('details')
      s && (s.open = !1)
      const r = n.formAction,
        i = n.value,
        { deleted: o } = await (async function (e, t) {
          const n = a((e = e.replace('https://api.github.com/', '')), {
            method: 'POST',
            body: JSON.stringify({ content: t }),
          })
          n.headers.set('Accept', 'application/vnd.github.v3+json')
          const s = await c(n),
            r = s.ok ? await s.json() : null
          if (201 === s.status) return { reaction: r, deleted: !1 }
          if (200 !== s.status)
            throw new Error(
              'expected "201 reaction created" or "200 reaction already exists"',
            )
          const i = a(`${e}/${r.id}`, { method: 'DELETE' })
          return (
            i.headers.set('Accept', 'application/vnd.github.v3+json'),
            await c(i),
            { reaction: r, deleted: !0 }
          )
        })(r, i),
        l = `button[reaction][formaction="${r}"][value="${i}"],[reaction-count][reaction-url="${r}"]`,
        h = Array.from(document.querySelectorAll(l)),
        u = o ? -1 : 1
      for (const e of h)
        e.setAttribute(
          'reaction-count',
          (parseInt(e.getAttribute('reaction-count'), 10) + u).toString(),
        )
      ;(n.disabled = !1), b()
    },
    !0,
  )
}
function x(e, t) {
  const n = (t) =>
    $(e, t, !1, 0) +
    `<span class="reaction-name" aria-hidden="true">${w[t]}</span>`
  return `\n  <details class="details-overlay details-popover reactions-popover">\n    <summary ${
    'center' === t ? 'tabindex="-1"' : ''
  }>${A}</summary>\n    <div class="Popover" style="${
    'center' === t ? 'left: 50%;transform: translateX(-50%)' : 'right:6px'
  }">\n      <form class="Popover-message ${
    'center' === t ? '' : 'Popover-message--top-right'
  } box-shadow-large" action="javascript:">\n        <span class="reaction-name">Pick your reaction</span>\n        <div class="BtnGroup">\n          ${r
    .slice(0, 4)
    .map(n)
    .join('')}\n        </div>\n        <div class="BtnGroup">\n          ${r
    .slice(4)
    .map(n)
    .join('')}\n        </div>\n      </form>\n    </div>\n  </details>`
}
function L(e) {
  return `\n  <details class="details-overlay details-popover reactions-popover">\n    <summary aria-label="Reactions Menu">${A}</summary>\n    <div class="Popover" style="${
    'center' === e ? 'left: 50%;transform: translateX(-50%)' : 'right:6px'
  }">\n      <div class="Popover-message ${
    'center' === e ? '' : 'Popover-message--top-right'
  } box-shadow-large" style="padding: 16px">\n        <span><a href="${s(
    t.url,
  )}" target="_top">Sign in</a> to add your reaction.</span>\n      </div>\n    </div>\n  </details>`
}
const A =
    '<svg class="octicon" style="margin-right:3px" viewBox="0 0 7 16" version="1.1" width="7" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 4H3v3H0v1h3v3h1V8h3V7H4V4z"></path></svg><svg class="octicon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm4.81 12.81a6.72 6.72 0 0 1-2.17 1.45c-.83.36-1.72.53-2.64.53-.92 0-1.81-.17-2.64-.53-.81-.34-1.55-.83-2.17-1.45a6.773 6.773 0 0 1-1.45-2.17A6.59 6.59 0 0 1 1.21 8c0-.92.17-1.81.53-2.64.34-.81.83-1.55 1.45-2.17.62-.62 1.36-1.11 2.17-1.45A6.59 6.59 0 0 1 8 1.21c.92 0 1.81.17 2.64.53.81.34 1.55.83 2.17 1.45.62.62 1.11 1.36 1.45 2.17.36.83.53 1.72.53 2.64 0 .92-.17 1.81-.53 2.64-.34.81-.83 1.55-1.45 2.17zM4 6.8v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2H5.2C4.53 8 4 7.47 4 6.8zm5 0v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2h-.59C9.53 8 9 7.47 9 6.8zm4 3.2c-.72 1.88-2.91 3-5 3s-4.28-1.13-5-3c-.14-.39.23-1 .66-1h8.59c.41 0 .89.61.75 1z"></path></svg>',
  C = {
    COLLABORATOR: 'Collaborator',
    CONTRIBUTOR: 'Contributor',
    MEMBER: 'Member',
    OWNER: 'Owner',
    FIRST_TIME_CONTRIBUTOR: 'First time contributor',
    FIRST_TIMER: 'First timer',
    NONE: '',
  }
class k {
  constructor(e, t, n) {
    ;(this.comment = e), (this.currentUser = t)
    const {
      user: s,
      html_url: i,
      created_at: o,
      body_html: a,
      author_association: l,
      reactions: c,
    } = e
    ;(this.element = document.createElement('article')),
      this.element.classList.add('timeline-comment'),
      s.login === t && this.element.classList.add('current-user')
    const h = C[l],
      u = r.reduce((e, t) => e + c[t], 0)
    let p = '',
      g = ''
    n ||
      (t
        ? ((p = x(e.reactions.url, 'right')),
          (g = x(e.reactions.url, 'center')))
        : ((p = L('right')), (g = L('center')))),
      (this.element.innerHTML = `\n      <a class="avatar" href="${
        s.html_url
      }" target="_blank" tabindex="-1">\n        <img alt="@${
        s.login
      }" height="44" width="44"\n              src="${
        s.avatar_url
      }?v=3&s=88">\n      </a>\n      <div class="comment">\n        <header class="comment-header">\n          <span class="comment-meta">\n            <a class="text-link" href="${
        s.html_url
      }" target="_blank"><strong>${
        s.login
      }</strong></a>\n            commented\n            <a class="text-link" href="${i}" target="_blank">${(function (
        e,
        t,
      ) {
        const n = e - t.getTime()
        if (n < 5e3) return 'just now'
        let s = 0
        for (; s + 2 < d.length && 1.1 * n > d[s + 2]; ) s += 2
        const r = d[s],
          i = d[s + 1],
          o = Math.round(n / r)
        return o > 3 && s === d.length - 2
          ? `on ${t.toLocaleDateString(void 0, m)}`
          : 1 === o
          ? `${'hour' === i ? 'an' : 'a'} ${i} ago`
          : `${o} ${i}s ago`
      })(
        Date.now(),
        new Date(o),
      )}</a>\n          </span>\n          <div class="comment-actions">\n            ${
        h ? `<span class="author-association-badge">${h}</span>` : ''
      }\n            ${p}\n          </div>\n        </header>\n        <div class="markdown-body markdown-body-scrollable">\n          ${a}\n        </div>\n        <div class="comment-footer" reaction-count="${u}" reaction-url="${
        c.url
      }">\n          <form class="reaction-list BtnGroup" action="javascript:">\n            ${r
        .map((e) => $(c.url, e, !t || n, c[e]))
        .join(
          '',
        )}\n          </form>\n          ${g}\n        </div>\n      </div>`)
    const v = this.element.querySelector('.markdown-body'),
      f = v.querySelector('.email-hidden-toggle a')
    if (f) {
      const e = v.querySelector('.email-hidden-reply')
      f.onclick = (t) => {
        t.preventDefault(), e.classList.toggle('expanded')
      }
    }
    S(v)
  }
  setCurrentUser(e) {
    this.currentUser !== e &&
      ((this.currentUser = e),
      this.comment.user.login === this.currentUser
        ? this.element.classList.add('current-user')
        : this.element.classList.remove('current-user'))
  }
}
function S(e) {
  Array.from(e.querySelectorAll(':not(.email-hidden-toggle) > a')).forEach(
    (e) => {
      ;(e.target = '_top'), (e.rel = 'noopener noreferrer')
    },
  ),
    Array.from(e.querySelectorAll('img')).forEach((e) => (e.onload = b)),
    Array.from(e.querySelectorAll('a.commit-tease-sha')).forEach(
      (e) => (e.href = 'https://github.com' + e.pathname),
    )
}
class T {
  constructor(e, t) {
    ;(this.user = e),
      (this.issue = t),
      (this.timeline = []),
      (this.count = 0),
      (this.element = document.createElement('main')),
      this.element.classList.add('timeline'),
      (this.element.innerHTML =
        '\n      <h1 class="timeline-header">\n        <a class="text-link" target="_blank"></a>\n        <em>\n          - powered by\n          <a class="text-link" href="https://utteranc.es" target="_blank">utteranc.es</a>\n        </em>\n      </h1>'),
      (this.countAnchor = this.element.firstElementChild.firstElementChild),
      (this.marker = document.createComment('marker')),
      this.element.appendChild(this.marker),
      this.setIssue(this.issue),
      this.renderCount()
  }
  setUser(e) {
    this.user = e
    const t = e ? e.login : null
    for (let e = 0; e < this.timeline.length; e++)
      this.timeline[e].setCurrentUser(t)
    b()
  }
  setIssue(e) {
    ;(this.issue = e),
      e
        ? ((this.count = e.comments),
          (this.countAnchor.href = e.html_url),
          this.renderCount())
        : this.countAnchor.removeAttribute('href')
  }
  insertComment(e, t) {
    const n = new k(e, this.user ? this.user.login : null, this.issue.locked),
      s = this.timeline.findIndex((t) => t.comment.id >= e.id)
    if (-1 === s)
      this.timeline.push(n), this.element.insertBefore(n.element, this.marker)
    else {
      const t = this.timeline[s],
        r = t.comment.id === e.id
      this.element.insertBefore(n.element, t.element),
        this.timeline.splice(s, r ? 1 : 0, n),
        r && t.element.remove()
    }
    t && (this.count++, this.renderCount()), b()
  }
  insertPageLoader(e, t, n) {
    const { element: s } = this.timeline.find((t) => t.comment.id >= e.id)
    s.insertAdjacentHTML(
      'afterend',
      `\n      <div class="page-loader">\n        <div class="zigzag"></div>\n        <button type="button" class="btn btn-outline btn-large">\n          ${t} hidden items<br/>\n          <span>Load more...</span>\n        </button>\n      </div>\n    `,
    )
    const r = s.nextElementSibling,
      i = r.lastElementChild,
      o = i.lastElementChild
    return (
      (i.onclick = n),
      {
        setBusy() {
          ;(o.textContent = 'Loading...'), (i.disabled = !0)
        },
        remove() {
          ;(i.onclick = null), r.remove()
        },
      }
    )
  }
  renderCount() {
    this.countAnchor.textContent = `${this.count} Comment${
      1 === this.count ? '' : 's'
    }`
  }
}
let _
function M() {
  return (
    _ ||
      (_ = h('utterances.json').then(
        (e) => (Array.isArray(e.origins) || (e.origins = []), e),
        () => ({ origins: [t.origin] }),
      )),
    _
  )
}
const j = `data:image/svg+xml;base64,${btoa(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16" version="1.1"><path fill="rgb(179,179,179)" fill-rule="evenodd" d="M8 10.5L9 14H5l1-3.5L5.25 9h3.5L8 10.5zM10 6H4L2 7h10l-2-1zM9 2L7 3 5 2 4 5h6L9 2zm4.03 7.75L10 9l1 2-2 3h3.22c.45 0 .86-.31.97-.75l.56-2.28c.14-.53-.19-1.08-.72-1.22zM4 9l-3.03.75c-.53.14-.86.69-.72 1.22l.56 2.28c.11.44.52.75.97.75H5l-2-3 1-2z"></path></svg>',
)}`
class R {
  constructor(e, n) {
    ;(this.user = e),
      (this.submit = n),
      (this.submitting = !1),
      (this.renderTimeout = 0),
      (this.handleInput = () => {
        M()
        const e = this.textarea.value,
          t = /^\s*$/.test(e)
        ;(this.submitButton.disabled = t),
          this.textarea.scrollHeight < 450 &&
            this.textarea.offsetHeight < this.textarea.scrollHeight &&
            ((this.textarea.style.height = `${this.textarea.scrollHeight}px`),
            b()),
          clearTimeout(this.renderTimeout),
          t
            ? (this.preview.textContent = 'Nothing to preview')
            : ((this.preview.textContent = 'Loading preview...'),
              (this.renderTimeout = setTimeout(
                () =>
                  (function (e) {
                    return c(
                      a('markdown', {
                        method: 'POST',
                        body: JSON.stringify({
                          text: e,
                          mode: 'gfm',
                          context: `${i}/${o}`,
                        }),
                      }),
                    ).then((e) => e.text())
                  })(e)
                    .then((e) => (this.preview.innerHTML = e))
                    .then(() => S(this.preview))
                    .then(b),
                500,
              )))
      }),
      (this.handleSubmit = async (e) => {
        e.preventDefault(),
          this.submitting ||
            ((this.submitting = !0),
            (this.textarea.disabled = !0),
            (this.submitButton.disabled = !0),
            await this.submit(this.textarea.value).catch(() => 0),
            (this.submitting = !1),
            (this.textarea.disabled = !this.user),
            (this.textarea.value = ''),
            (this.submitButton.disabled = !1),
            this.handleClick({
              ...e,
              target: this.form.querySelector('.tabnav-tab.tab-write'),
            }),
            (this.preview.textContent = 'Nothing to preview'))
      }),
      (this.handleClick = ({ target: e }) => {
        if (
          !(
            e instanceof HTMLButtonElement && e.classList.contains('tabnav-tab')
          )
        )
          return
        if ('true' === e.getAttribute('aria-selected')) return
        this.form
          .querySelector('.tabnav-tab[aria-selected="true"]')
          .setAttribute('aria-selected', 'false'),
          e.setAttribute('aria-selected', 'true')
        const t = e.classList.contains('tab-preview')
        ;(this.textarea.style.display = t ? 'none' : ''),
          (this.preview.style.display = t ? '' : 'none'),
          b()
      }),
      (this.handleKeyDown = ({ which: e, ctrlKey: t }) => {
        13 === e &&
          t &&
          !this.submitButton.disabled &&
          this.form.dispatchEvent(new CustomEvent('submit'))
      }),
      (this.element = document.createElement('article')),
      this.element.classList.add('timeline-comment'),
      (this.element.innerHTML = `\n      <a class="avatar" target="_blank" tabindex="-1">\n        <img height="44" width="44">\n      </a>\n      <form class="comment" accept-charset="UTF-8" action="javascript:">\n        <header class="new-comment-header tabnav">\n          <div class="tabnav-tabs" role="tablist">\n            <button type="button" class="tabnav-tab tab-write"\n                    role="tab" aria-selected="true">\n              Write\n            </button>\n            <button type="button" class="tabnav-tab tab-preview"\n                    role="tab">\n              Preview\n            </button>\n          </div>\n        </header>\n        <div class="comment-body">\n          <textarea class="form-control" placeholder="Leave a comment" aria-label="comment"></textarea>\n          <div class="markdown-body" style="display: none">\n            Nothing to preview\n          </div>\n        </div>\n        <footer class="new-comment-footer">\n          <a class="text-link markdown-info" tabindex="-1" target="_blank"\n             href="https://guides.github.com/features/mastering-markdown/">\n            <svg class="octicon v-align-bottom" viewBox="0 0 16 16" version="1.1"\n              width="16" height="16" aria-hidden="true">\n              <path fill-rule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15\n                13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4\n                8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z">\n              </path>\n            </svg>\n            Styling with Markdown is supported\n          </a>\n          <button class="btn btn-primary" type="submit">Comment</button>\n          <a class="btn btn-primary" href="${s(
        t.url,
      )}" target="_top">\n            <svg class="octicon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>\n            Sign in with GitHub\n          </a>\n        </footer>\n      </form>`),
      (this.avatarAnchor = this.element.firstElementChild),
      (this.avatar = this.avatarAnchor.firstElementChild),
      (this.form = this.avatarAnchor.nextElementSibling),
      (this.textarea =
        this.form.firstElementChild.nextElementSibling.firstElementChild),
      (this.preview =
        this.form.firstElementChild.nextElementSibling.lastElementChild),
      (this.signInAnchor = this.form.lastElementChild.lastElementChild),
      (this.submitButton = this.signInAnchor.previousElementSibling),
      this.setUser(e),
      (this.submitButton.disabled = !0),
      this.textarea.addEventListener('input', this.handleInput),
      this.form.addEventListener('submit', this.handleSubmit),
      this.form.addEventListener('click', this.handleClick),
      this.form.addEventListener('keydown', this.handleKeyDown),
      (function (e) {
        const t = () => {
            removeEventListener('mousemove', b),
              removeEventListener('mouseup', t)
          },
          n = () => {
            addEventListener('mousemove', b), addEventListener('mouseup', t)
          }
        e.addEventListener('mousedown', n)
      })(this.textarea)
  }
  setUser(e) {
    ;(this.user = e),
      (this.submitButton.hidden = !e),
      (this.signInAnchor.hidden = !!e),
      e
        ? ((this.avatarAnchor.href = e.html_url),
          (this.avatar.alt = '@' + e.login),
          (this.avatar.src = e.avatar_url + '?v=3&s=88'),
          (this.textarea.disabled = !1),
          (this.textarea.placeholder = 'Leave a comment'))
        : (this.avatarAnchor.removeAttribute('href'),
          (this.avatar.alt = '@anonymous'),
          (this.avatar.src = j),
          (this.textarea.disabled = !0),
          (this.textarea.placeholder = 'Sign in to comment'))
  }
  clear() {
    this.textarea.value = ''
  }
}
var O
function H() {
  return null !== t.issueNumber
    ? ((e = t.issueNumber),
      c(a(`repos/${i}/${o}/issues/${e}`)).then((e) => {
        if (!e.ok) throw new Error('Error fetching issue via issue number.')
        return e.json()
      }))
    : (function (e) {
        const t = `"${e}" type:issue in:title repo:${i}/${o}`
        return c(
          a(`search/issues?q=${encodeURIComponent(t)}&sort=created&order=asc`),
        )
          .then((e) => {
            if (!e.ok) throw new Error('Error fetching issue via search.')
            return e.json()
          })
          .then((n) => {
            if (0 === n.total_count) return null
            n.total_count > 1 && console.warn(`Multiple issues match "${t}".`),
              (e = e.toLowerCase())
            for (const t of n.items)
              if (-1 !== t.title.toLowerCase().indexOf(e)) return t
            return (
              console.warn(
                `Issue search results do not contain an issue with title matching "${e}". Using first result.`,
              ),
              n.items[0]
            )
          })
      })(t.issueTerm)
  var e
}
;(i = (O = t).owner),
  (o = O.repo),
  (async function () {
    await (async function () {
      if (n.value) return n.value
      if (!t.session) return null
      const e = await fetch('https://api.utteranc.es/token', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(t.session),
      })
      if (e.ok) {
        const t = await e.json()
        return (n.value = t), t
      }
      return null
    })()
    let [e, s] = await Promise.all([
      H(),
      null === n.value
        ? Promise.resolve(null)
        : c(a('user')).then((e) => (e.ok ? e.json() : null)),
      ((r = t.theme),
      (l = t.origin),
      new Promise((e) => {
        const t = document.createElement('link')
        ;(t.rel = 'stylesheet'),
          t.setAttribute('crossorigin', 'anonymous'),
          (t.onload = e),
          (t.href = `/stylesheets/themes/${r}/utterances.css`),
          document.head.appendChild(t),
          addEventListener('message', (e) => {
            e.origin === l &&
              'set-theme' === e.data.type &&
              (t.href = `/stylesheets/themes/${e.data.theme}/utterances.css`)
          })
      })),
    ])
    var r, l
    !(function (e) {
      ;(p = e), addEventListener('resize', b), addEventListener('load', b)
    })(t.origin)
    const h = new T(s, e)
    if (
      (document.body.appendChild(h.element),
      e &&
        e.comments > 0 &&
        (async function (e, t) {
          const n = (e) => {
              for (const n of e) t.insertComment(n, !1)
            },
            s = Math.ceil(e.comments / 25),
            r = [u(e.number, 1)]
          s > 1 && r.push(u(e.number, s))
          s > 2 &&
            e.comments % 25 < 3 &&
            e.comments % 25 != 0 &&
            r.push(u(e.number, s - 1))
          const i = await Promise.all(r)
          for (const e of i) n(e)
          let o = s - r.length,
            a = 2
          const l = (s) => {
            if (0 === o) return
            const r = async () => {
                c.setBusy()
                const t = await u(e.number, a)
                c.remove(), n(t), o--, a++, l(t)
              },
              i = s.pop(),
              c = t.insertPageLoader(i, 25 * o, r)
          }
          l(i[0])
        })(e, h),
      b(),
      e && e.locked)
    )
      return
    E(!!s)
    const d = new R(s, async (s) => {
      await (async function () {
        const { origins: e } = await M(),
          { origin: n, owner: s, repo: r } = t
        if (-1 !== e.indexOf(n)) return
        throw (
          (document
            .querySelector('.timeline')
            .lastElementChild.insertAdjacentHTML(
              'beforebegin',
              `\n  <div class="flash flash-error flash-not-installed">\n    Error: <code>${n}</code> is not permitted to post to <code>${s}/${r}</code>.\n    Confirm this is the correct repo for this site's comments. If you own this repo,\n    <a href="https://github.com/${s}/${r}/edit/master/utterances.json" target="_top">\n      <strong>update the utterances.json</strong>\n    </a>\n    to include <code>${n}</code> in the list of origins.<br/><br/>\n    Suggested configuration:<br/>\n    <pre><code>${JSON.stringify(
                { origins: [n] },
                null,
                2,
              )}</code></pre>\n  </div>`,
            ),
          b(),
          new Error('Origin not permitted.'))
        )
      })(),
        e ||
          ((e = await (function (e, t, s, r, a) {
            const l = `https://api.utteranc.es/repos/${i}/${o}/issues${
                a ? `?label=${encodeURIComponent(a)}` : ''
              }`,
              c = new Request(l, {
                method: 'POST',
                body: JSON.stringify({
                  title: e,
                  body: `# ${s}\n\n${r}\n\n[${t}](${t})`,
                }),
              })
            return (
              c.headers.set('Accept', 'application/vnd.github.v3+json'),
              c.headers.set('Authorization', `token ${n.value}`),
              fetch(c).then((e) => {
                if (!e.ok)
                  throw new Error('Error creating comments container issue')
                return e.json()
              })
            )
          })(t.issueTerm, t.url, t.title, t.description || '', t.label)),
          h.setIssue(e))
      const r = await (function (e, t) {
        const n = a(`repos/${i}/${o}/issues/${e}/comments`, {
          method: 'POST',
          body: JSON.stringify({ body: t }),
        })
        return (
          n.headers.set(
            'Accept',
            'application/vnd.github.VERSION.html+json,application/vnd.github.v3+json',
          ),
          c(n).then((e) => {
            if (!e.ok) throw new Error('Error posting comment.')
            return e.json()
          })
        )
      })(e.number, s)
      h.insertComment(r, !0), d.clear()
    })
    h.element.appendChild(d.element)
  })(),
  addEventListener('not-installed', function e() {
    removeEventListener('not-installed', e),
      document
        .querySelector('.timeline')
        .insertAdjacentHTML(
          'afterbegin',
          `\n  <div class="flash flash-error">\n    Error: utterances is not installed on <code>${t.owner}/${t.repo}</code>.\n    If you own this repo,\n    <a href="https://github.com/apps/utterances" target="_top"><strong>install the app</strong></a>.\n    Read more about this change in\n    <a href="https://github.com/utterance/utterances/pull/25" target="_top">the PR</a>.\n  </div>`,
        ),
      b()
  })
//# sourceMappingURL=utterances.6ec01640.js.map
