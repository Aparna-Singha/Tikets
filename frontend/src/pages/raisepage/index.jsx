import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Earth,
  EyeClosed,
  HatGlasses,
  Home,
  LoaderCircle,
  Plus,
  Rocket,
  Save,
} from "lucide-react";

import { generateTicket, getTicket, updateTicket } from "@api/ticket";
import { checkAuthStatus } from "@api/auth";

import "./style.css";

export function RaisePage({ createNew = false }) {
  const { orgId, ticketId } = useParams();
  const navigate = useNavigate();

  const [artifact, setArtifact] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  const [author, setAuthor] = useState("Anonymous");
  const [status, setStatus] = useState("Open");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [anonymous, setAnonymous] = useState(false);

  const addTag = useCallback(() => {
    const tagInput = document.getElementById("raise-page-tag-add-input");
    const tag = tagInput.value.trim();
    
    tagInput.value = "";
    if (!tag) return;
    
    setTags((prevTags) => {
      if (prevTags.includes(tag))
        return prevTags;

      return [...prevTags, tag];
    });
  }, []);

  const removeTag = useCallback((tag) => {
    setTags((prevTags) => prevTags.filter(
      (t) => t !== tag)
    );
  }, []);

  const updateDescription = useCallback((event) => {
    setDescription(event.target.value);
    event.target.style.height = `auto`;
    event.target.style.height = `${event.target.scrollHeight}px`;
  }, []);

  const toggleAnonymous = useCallback(() => {
    setAnonymous((prevAnonymous) => !prevAnonymous);
  }, []);

  const navigateHome = useCallback(() => {
    navigate(`/${orgId}`);
  }, [navigate, orgId]);

  const updateTicketData = useCallback(({
    title, description, author, status, tags
  }) => {
    setTitle(title);
    setDescription(description);
    setAuthor(author);
    setStatus(status);
    setTags(tags);
  }, []);

  const saveTicket = useCallback(async () => {
    const updates = {};

    if (artifact.title != title)
      updates.title = title;
    
    if (artifact.description != description)
      updates.description = description;
    
    if (artifact.anonymous != anonymous)
      updates.anonymous = anonymous;
    
    if (artifact.status != status)
      updates.status = status;

    if (JSON.stringify(artifact.tags) != JSON.stringify(tags))
      updates.tags = tags;

    if (Object.keys(updates).length > 0)
      updates.status = status === "draft"
        ? "draft"
        : "moderation";

    if (Object.keys(updates).length > 0)
      updates.timeline = [
        ...(artifact.timeline || []),
        {
          label: "moderation",
          timestamp: Date.now(),
        }
      ];
    
    await updateTicket(orgId, ticketId, updates);
    setArtifact((prevArtifact) => ({
      ...prevArtifact,
      ...updates,
    }));
  }, [
    orgId,
    ticketId,
    artifact,
    title,
    description,
    anonymous,
    status,
    tags,
  ]);

  const loadTicketData = useCallback(async (orgId, ticketId) => {
    const ticketData = await getTicket(orgId, ticketId);
    updateTicketData(ticketData);
    setArtifact(ticketData);
  }, [updateTicketData]);

  const publishTicket = useCallback(async () => {
    await saveTicket();

    const updates = {
      status: "moderation",
      timeline: [
        ...(artifact.timeline || []),
        {
          label: "moderation",
          timestamp: Date.now(),
        }
      ],
    };
    
    await updateTicket(orgId, ticketId, updates);
    setStatus("moderation");
    setArtifact((prevArtifact) => ({
      ...prevArtifact,
      ...updates,
    }));
  }, [artifact, orgId, ticketId, saveTicket]);

  const unpublishTicket = useCallback(async () => {
    await saveTicket();

    const updates = {
      status: "draft",
      timeline: [
        ...(artifact.timeline || []),
        {
          label: "draft",
          timestamp: Date.now(),
        }
      ],
    };
    
    await updateTicket(orgId, ticketId, updates);
    setStatus("draft");
    setArtifact((prevArtifact) => ({
      ...prevArtifact,
      ...updates,
    }));
  }, [saveTicket, artifact, orgId, ticketId]);

  useEffect(() => {
    async function checkAuth() {
      const authorized = await checkAuthStatus();
      if (!authorized)
        return navigate(`/auth`);
      setAuthorized(true);
    }

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (!authorized) return;
    if (!createNew) return;
    
    async function createTicket() {
      const { ticketId } = await generateTicket(orgId);
      navigate(`/org/raise/${ticketId}`);
    }

    createTicket();
  }, [authorized, createNew, navigate, orgId]);

  useEffect(() => {
    if (!authorized) return;
    if (!createNew)
      loadTicketData(orgId, ticketId);
  }, [authorized, createNew, orgId, ticketId, loadTicketData]);

  if (createNew || artifact === null) return (<>
    <div className="raise-page">
      <LoaderCircle className="raise-page-loader" />
    </div>
  </>);

  return (<>
    <div className="raise-page">
      <div className="raise-page-navbar">
        <button className="raise-page-home-button" onClick={navigateHome}>
          <Home strokeWidth={2} />
        </button>

        <div className="raise-page-header">
          <button className="raise-page-save" onClick={saveTicket}>
            <Save className="raise-page-save-icon" />
            <span>Save</span>
          </button>

          <div className="raise-page-id">
            {orgId}#{ticketId}
          </div>

          <div className="raise-page-status">
            <button
              onClick={
                status === "draft"
                  ? publishTicket
                  : unpublishTicket
              }
              className="raise-page-publish-toggle"
            >
              {
                status === "draft"
                  ? <Rocket className="raise-page-publish-icon" />
                  : <EyeClosed className="raise-page-publish-icon" />
              }
              <span>
                {
                  status === "draft"
                  ? "Publish"
                  : "Unpublish"
                }
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="raise-page-content">
        <div className="raise-page-main">
          <input
            className="raise-page-title"
            value={title}
            placeholder="Write the title of your ticket!"
            onChange={(e) => { setTitle(e.target.value); }}
          />

          <textarea
            className="raise-page-description"
            value={description}
            placeholder="Write the description of your ticket!"
            onChange={updateDescription}
          />
        </div>

        <div className="raise-page-meta">
          <div className="raise-page-meta-item">
            <h4 className="raise-page-meta-item-title">
              Raised by
            </h4>

            <div className="raise-page-meta-item-content">
              <div className="raise-page-visibility">
                <span>
                  {anonymous ? "Anonymous" : author}
                </span>

                <button
                  onClick={toggleAnonymous}
                  className="raise-page-visibility-toggle"
                >
                  {
                    anonymous
                      ? <Earth className="raise-page-visibility-icon" />
                      : <HatGlasses className="raise-page-visibility-icon" />
                  }
                  <span>
                    Be {!anonymous ? "Anonymous" : "Visible"}
                  </span>
                </button>
              </div>
            </div>

          </div>

          <div className="raise-page-meta-item">
            <h4 className="raise-page-meta-item-title">
              Tagged
            </h4>

            <div className="raise-page-meta-item-content">
              <div className="raise-page-tags-editor">
                <div className="raise-page-tag-add">
                  <input
                    type="text"
                    id="raise-page-tag-add-input"
                    className="raise-page-tag-add-input"
                    placeholder="Add tag"
                    onKeyUp={
                      (event) => (event.key === "Enter")
                        ? addTag()
                        : null
                    }
                  />
                  
                  <button
                    className="raise-page-tag-add-button"
                    onClick={addTag}
                  >
                    <Plus />
                  </button>
                </div>

                <div className="raise-page-tags">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="raise-page-tag"
                      onClick={() => removeTag(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="raise-page-tag-info">
                  Click on a tag to remove it
                </div>
              </div>
            </div>
          </div>

          <div className="raise-page-meta-item">
            <h4 className="raise-page-meta-item-title">
              Timeline
            </h4>

            <div className="raise-page-meta-item-content">
              Not available while editing
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}

